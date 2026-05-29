"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ActionButton } from "./ActionButton";
import type { TopBarConfigItem } from "../../types/dashboard/topbar";
import { cn } from "@/lib/utils";
import { SEARCH_ITEMS } from "../../constants/layout/search";

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/['’]/g, "").trim();
}

export function DashboardBar({ config }: { config: TopBarConfigItem }) {
  const searchPlaceholder = config.search ?? "search badge layouts...";

  return (
    <>
      <TopBarSearch
        placeholder={searchPlaceholder}
        className="min-w-0 max-w-[70%] flex-1"
      />

      {config.action && (
        <div className="flex shrink-0 items-center">
          <ActionButton action={config.action} />
        </div>
      )}
    </>
  );
}

export function TopBarSearch({
  onSelect,
  placeholder,
  className,
}: {
  onSelect?: () => void;
  placeholder: string;
  className?: string;
}) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = normalizeSearch(query);

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return SEARCH_ITEMS.filter((item) =>
      normalizeSearch(
        `${item.title} ${item.description} ${item.searchText}`,
      ).includes(normalizedQuery),
    ).slice(0, 8);
  }, [normalizedQuery]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div className="flex w-full items-center gap-[4.35px] rounded-[10.41px] bg-[#F8F8F8] py-2.5 pl-[12.5px] text-[14px] font-medium transition-shadow focus-within:ring-2 focus-within:ring-[#c54b00]">
        <Image
          src="/assets/dashboard/icons/search-icon.svg"
          height={24}
          width={24}
          alt="search icon"
        />
        <label htmlFor={inputId} className="sr-only">
          {placeholder}
        </label>
        <input
          id={inputId}
          aria-label={placeholder}
          className="w-full bg-transparent pr-3 outline-none"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;
            setQuery(nextQuery);
            setIsOpen(nextQuery.trim().length > 0);
          }}
        />
      </div>

      {isOpen && normalizedQuery && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-0 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[#E8E4DD] bg-white shadow-[0_18px_45px_rgba(18,18,18,0.12)]">
          <div className="border-b border-[#F0EDE8] px-4 py-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#9A9188]">
              Search results
            </p>
          </div>

          <div className="max-h-[360px] overflow-y-auto py-2">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={`${item.group}-${item.title}`}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    onSelect?.();
                  }}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[#FAF8F4] min-[420px]:gap-4"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-[#2F2F2F]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] text-[#8A837A]">
                      {item.description}
                    </span>
                  </span>
                  <span className="hidden shrink-0 rounded-full bg-[#F5F1EA] px-2.5 py-1 text-[11px] font-medium text-[#7A7168] min-[420px]:inline">
                    {item.group}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-[14px] font-medium text-[#3A3A3A]">
                  No results found
                </p>
                <p className="mt-1 text-[12px] text-[#8A837A]">
                  Try searching for a badge name, status, or layout.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
