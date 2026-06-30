export const FONTS = [
  { id: "inter",    label: "INTER",    style: { fontFamily: "Inter, sans-serif" } },
  { id: "fraunces", label: "FRAUNCES", style: { fontFamily: "Fraunces, serif", fontStyle: "italic" as const } },
  { id: "mono",     label: "MONO",     style: { fontFamily: "ui-monospace, monospace" } },
  { id: "display",  label: "DISPLAY",  style: { fontFamily: "Georgia, serif", fontWeight: 700 } },
  { id: "bricolage", label: "BRICOLAGE", style: { fontFamily: "var(--font-bricolage), sans-serif" } },
];

export const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

export const TABS = ["Badge"] as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ordinal(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}TH`;
  switch (n % 10) {
    case 1: return `${n}ST`;
    case 2: return `${n}ND`;
    case 3: return `${n}RD`;
    default: return `${n}TH`;
  }
}
