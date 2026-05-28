export type ProfileInputProps = {
  values: { firstName: string; lastName: string; email: string; role: string };
  onChange: (field: "firstName" | "lastName" | "role", value: string) => void;
};
