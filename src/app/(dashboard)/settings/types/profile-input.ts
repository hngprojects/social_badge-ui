export type ProfileInputProps = {
  values: { firstName: string; lastName: string; email: string; role: string };
  errors?: Partial<Record<"firstName" | "lastName" | "role", string>>;
  onChange: (field: "firstName" | "lastName" | "role", value: string) => void;
};
