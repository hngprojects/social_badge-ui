"use client";

import { useCallback, useMemo, useState } from "react";
import type { CustomizeEditorState } from "../types/canvas-data";
import { paletteToBackgroundState } from "../lib/build-canvas-data";
import { LAYOUT_CAPABILITIES } from "../constants/layout-mapping";

export function useCustomizeEditorState(initialEditor: CustomizeEditorState) {
  const [editor, setEditor] = useState(initialEditor);

  const layoutCaps = useMemo(
    () => LAYOUT_CAPABILITIES[editor.layoutId],
    [editor.layoutId],
  );

  const patch = useCallback((partial: Partial<CustomizeEditorState>) => {
    setEditor((prev) => ({ ...prev, ...partial }));
  }, []);

  const setPalette = useCallback(
    (paletteId: string, bgMode: "gradient" | "solid" | "split" = editor.bgMode) => {
      setEditor((prev) => ({
        ...prev,
        ...paletteToBackgroundState(paletteId, bgMode === "split" ? "solid" : bgMode),
        bgMode,
      }));
    },
    [editor.bgMode],
  );

  const setBgMode = useCallback((bgMode: "gradient" | "solid" | "split") => {
    setEditor((prev) => ({
      ...prev,
      ...paletteToBackgroundState(prev.paletteId, bgMode === "split" ? "solid" : bgMode),
      bgMode,
    }));
  }, []);

  return {
    editor,
    patch,
    setPalette,
    setBgMode,
    layoutCaps,
  };
}
