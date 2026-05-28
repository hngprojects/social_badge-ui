import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";

import { ProfileInputProps } from "../types/profile-input";

export function ProfileInput({ values, onChange }: ProfileInputProps) {
  return (
    <FieldSet className="w-full text-[14px] font-normal text-[#B5B7BC]">
      <FieldGroup className="gap-4">
        {/* FULL NAME */}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="fullname"
          >
            Full name
            <Asterisk className="w-2 h-auto text-error-500 font-medium tracking-normal leading-0" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 text-[14px] text-[#121217] placeholder:text-[#B5B7BC] font-medium bg-[#E7E8E94D]/30"
            id="fullname"
            type="text"
            value={values.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </Field>
        {/* EMAIL ADDRESS*/}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="email"
          >
            Email address
            <Asterisk className="w-2 h-auto text-error-500" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 text-[14px] text-[#121217] placeholder:text-[#B5B7BC] bg-[#E7E8E94D]/30"
            id="role"
            type="text"
            value={values.email}
            disabled
          />
          <FieldDescription>
            Your email address cannot be changed
          </FieldDescription>
        </Field>
        {/* ROLE/TITLE*/}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#121217] gap-0 font-medium"
            htmlFor="email"
          >
            Role / Title
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 font-medium text-[14px] text-[#121217] bg-[#E7E8E94D]/30"
            id="role"
            type="text"
            value={values.role}
            onChange={(e) => onChange("role", e.target.value)}
          />
          <FieldDescription>Optional.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
