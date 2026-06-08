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
      const isSplit = bgMode === "split";
      const priMode = isSplit ? (editor.priBgMode ?? "solid") : bgMode;
      
      setEditor((prev) => ({
        ...prev,
        ...paletteToBackgroundState(paletteId, priMode as "gradient" | "solid"),
        bgMode,
        priBgMode: priMode as "gradient" | "solid",
      }));
    },
    [editor.bgMode, editor.priBgMode],
  );

  const setBgMode = useCallback((bgMode: "gradient" | "solid" | "split") => {
    setEditor((prev) => {
      // If we are currently split and trying to set a sub-mode (gradient/solid),
      // we update the priBgMode but keep the overall mode as 'split'.
      const shouldStaySplit = prev.bgMode === "split" && (bgMode === "gradient" || bgMode === "solid");
      const effectiveOverallMode = shouldStaySplit ? "split" : bgMode;
      const priMode = bgMode === "split" ? (prev.priBgMode ?? "solid") : bgMode;

      return {
        ...prev,
        ...paletteToBackgroundState(prev.paletteId, priMode as "gradient" | "solid"),
        bgMode: effectiveOverallMode as "gradient" | "solid" | "split",
        priBgMode: priMode as "gradient" | "solid",
      };
    });
  }, []);

  return {
    editor,
    patch,
    setPalette,
    setBgMode,
    layoutCaps,
  };
}
