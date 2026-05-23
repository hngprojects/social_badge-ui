"use client";

import React, { useState } from "react";
import { MONTHS, ordinal } from "./constants";

/* ── SectionCard ────────────────────────────────────────────────────────── */

export function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-100">
        <span className="mt-0.5 text-orange-500">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  );
}

/* ── FieldLabel ─────────────────────────────────────────────────────────── */

export function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
      {label}
      {required && <span className="text-[#FB3748] ml-0.5">*</span>}
    </label>
  );
}

/* ── TextInput ──────────────────────────────────────────────────────────── */

export function TextInput({
  placeholder,
  value,
  onChange,
  maxLength,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-12 px-4 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium"
      />
      {maxLength && (
        <span className="absolute right-3 bottom-[-18px] text-[10px] font-medium text-gray-400">
          {(value ?? "").length}/{maxLength}
        </span>
      )}
    </div>
  );
}

/* ── HelperText ─────────────────────────────────────────────────────────── */

export function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-400 mt-1.5">{children}</p>;
}

/* ── TextArea ───────────────────────────────────────────────────────────── */

export function TextArea({
  placeholder,
  value,
  onChange,
  maxLength,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <div className="relative">
      <textarea
        rows={3}
        placeholder={placeholder}
        value={value ?? ""}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium resize-none"
      />
      {maxLength && (
        <span className="absolute right-3 bottom-[-18px] text-[10px] font-medium text-gray-400">
          {(value ?? "").length}/{maxLength}
        </span>
      )}
    </div>
  );
}

/* ── Toggle ─────────────────────────────────────────────────────────────── */

export function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
        checked ? "bg-orange-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ── BadgeDatePicker ────────────────────────────────────────────────────── */

export function BadgeDatePicker({
  onChange,
}: {
  onChange: (formatted: string) => void;
}) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const daysInMonth = month ? new Date(new Date().getFullYear(), MONTHS.indexOf(month) + 1, 0).getDate() : 31;

  const handleChange = (newMonth: string, newDay: string) => {
    if (newMonth && newDay) {
      const dm = new Date(new Date().getFullYear(), MONTHS.indexOf(newMonth) + 1, 0).getDate();
      const validDay = Math.min(parseInt(newDay), dm);
      onChange(`${newMonth.toUpperCase()} ${ordinal(validDay)}`);
    }
  };

  const selectClass =
    "flex-1 h-12 px-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-[#F6F6F6] text-[#595959] text-sm font-medium appearance-none cursor-pointer";

  return (
    <div className="flex gap-2">
      <select
        value={month}
        onChange={(e) => {
          const newMonth = e.target.value;
          setMonth(newMonth);
          if (newMonth && day) {
            const dm = new Date(new Date().getFullYear(), MONTHS.indexOf(newMonth) + 1, 0).getDate();
            const validDay = Math.min(parseInt(day), dm);
            if (validDay !== parseInt(day)) setDay(String(validDay));
            handleChange(newMonth, String(validDay));
          } else {
            handleChange(newMonth, day);
          }
        }}
        className={selectClass}
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={day}
        onChange={(e) => { setDay(e.target.value); handleChange(month, e.target.value); }}
        className={`${selectClass} max-w-22.5`}
      >
        <option value="">Day</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}
