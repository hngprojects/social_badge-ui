"use client";

import React, { useState } from "react";
import { MONTHS, ordinal } from "./constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Label className="block text-xs font-bold uppercase tracking-wider text-[#595959] mb-1.5">
      {label}
      {required && <span className="text-[#FB3748] ml-0.5">*</span>}
    </Label>
  );
}

/* ── TextInput ──────────────────────────────────────────────────────────── */

export const TextInput = React.forwardRef<
	HTMLInputElement,
	{
		placeholder?: string;
		value?: string;
		onChange?: React.ChangeEventHandler<HTMLInputElement> | ((v: string) => void);
		maxLength?: number;
		name?: string;
		onBlur?: React.FocusEventHandler<HTMLInputElement>;
	}
>(({ placeholder, value, onChange, maxLength, name, onBlur }, ref) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		if (typeof onChange === 'function' && onChange.length === 1 && name) {
			(onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
		} else if (typeof onChange === 'function') {
			(onChange as (v: string) => void)(e.target.value);
		}
	};

	return (
		<div className="relative">
			<Input
				ref={ref}
				name={name}
				onBlur={onBlur}
				type="text"
				placeholder={placeholder}
				value={value}
				maxLength={maxLength}
				onChange={handleChange}
				className="h-12 px-4 rounded-xl border-[#BDBDBD] bg-[#F6F6F6] text-[#595959] text-sm font-medium focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
			/>
			{maxLength && (
				<span className="absolute right-3 bottom-[-18px] text-[10px] font-medium text-gray-400">
					{(value ?? "").length}/{maxLength}
				</span>
			)}
		</div>
	);
});
TextInput.displayName = "TextInput";

/* ── HelperText ─────────────────────────────────────────────────────────── */

export function HelperText({ children }: { children: React.ReactNode }) {
	return <p className="text-xs text-gray-400 mt-1.5">{children}</p>;
}

/* ── TextArea ───────────────────────────────────────────────────────────── */

export const TextArea = React.forwardRef<
	HTMLTextAreaElement,
	{
		placeholder?: string;
		value?: string;
		onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | ((v: string) => void);
		maxLength?: number;
		name?: string;
		onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
	}
>(({ placeholder, value, onChange, maxLength, name, onBlur }, ref) => {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (!onChange) return;
		if (typeof onChange === 'function' && onChange.length === 1 && name) {
			(onChange as React.ChangeEventHandler<HTMLTextAreaElement>)(e);
		} else if (typeof onChange === 'function') {
			(onChange as (v: string) => void)(e.target.value);
		}
	};

	return (
		<div className="relative">
			<Textarea
				ref={ref}
				name={name}
				onBlur={onBlur}
				rows={3}
				placeholder={placeholder}
				value={value}
				maxLength={maxLength}
				onChange={handleChange}
				className="px-4 py-3 rounded-xl border-[#BDBDBD] bg-[#F6F6F6] text-[#595959] text-sm font-medium focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
			/>
			{maxLength && (
				<span className="absolute right-3 bottom-[-18px] text-[10px] font-medium text-gray-400">
					{(value ?? "").length}/{maxLength}
				</span>
			)}
		</div>
	);
});
TextArea.displayName = "TextArea";

/* ── Toggle ─────────────────────────────────────────────────────────────── */

export function Toggle({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: (v: boolean) => void;
}) {
	return <Switch checked={checked} onCheckedChange={onChange} />;
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

  const triggerClass =
    "flex-1 h-12 px-3 rounded-xl border-[#BDBDBD] bg-[#F6F6F6] text-[#595959] text-sm font-medium focus-visible:ring-orange-500/20 focus-visible:border-orange-500";

  return (
    <div className="flex gap-2">
      <Select
        value={month}
        onValueChange={(newMonth) => {
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
      >
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={day}
        onValueChange={(val) => { setDay(val); handleChange(month, val); }}
      >
        <SelectTrigger className={`${triggerClass} max-w-22.5`}>
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
            <SelectItem key={d} value={String(d)}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
