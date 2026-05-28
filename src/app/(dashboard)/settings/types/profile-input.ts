export type ProfileInputProps = {
  values: { fullName: string; email: string; role: string };
  onChange: (field: "fullName" | "email" | "role", value: string) => void;
};
