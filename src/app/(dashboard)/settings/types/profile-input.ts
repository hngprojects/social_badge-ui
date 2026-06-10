import type { ProfileFieldErrors } from "@/app/features/settings/types";

export type ProfileInputProps = {
  values: { firstName: string; lastName: string; email: string; role: string };
  errors?: ProfileFieldErrors;
  onChange: (field: "firstName" | "lastName" | "role", value: string) => void;
};
