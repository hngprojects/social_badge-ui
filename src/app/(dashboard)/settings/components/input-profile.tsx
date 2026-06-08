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

const NAME_MAX_LENGTH = 50;

export function ProfileInput({ values, errors, onChange }: ProfileInputProps) {
  return (
    <FieldSet className="w-full text-[14px] font-normal text-[#B5B7BC]">
      <FieldGroup className="gap-4">
        {/* FIRST NAME */}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="firstName"
          >
            First name
            <Asterisk className="w-2 h-auto text-error-500 font-medium tracking-normal leading-0" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 text-[14px] text-[#121217] placeholder:text-[#B5B7BC] font-medium bg-[#E7E8E94D]/30"
            id="firstName"
            type="text"
            required
            aria-required="true"
            aria-invalid={!!errors?.firstName}
            autoComplete="given-name"
            maxLength={NAME_MAX_LENGTH}
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
          {errors?.firstName && (
            <FieldDescription className="text-error-500">
              {errors.firstName}
            </FieldDescription>
          )}
        </Field>
        {/* LAST NAME */}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="lastName"
          >
            Last name
            <Asterisk className="w-2 h-auto text-error-500 font-medium tracking-normal leading-0" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 text-[14px] text-[#121217] placeholder:text-[#B5B7BC] font-medium bg-[#E7E8E94D]/30"
            id="lastName"
            required
            aria-required="true"
            aria-invalid={!!errors?.lastName}
            autoComplete="family-name"
            maxLength={NAME_MAX_LENGTH}
            type="text"
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
          {errors?.lastName && (
            <FieldDescription className="text-error-500">
              {errors.lastName}
            </FieldDescription>
          )}
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
            className="w-full rounded-[8px] py-2 px-4 text-[14px] text-[#B5B7BC] bg-[#E7E8E94D]/30"
            id="email"
            type="email"
            readOnly
            aria-readonly="true"
            value={values.email}
          />
          <FieldDescription>
            Your email address cannot be changed
          </FieldDescription>
        </Field>
        {/* ROLE/TITLE*/}
        <Field className="w-full gap-2">
          <FieldLabel
            className="w-full text-[#121217] gap-0 font-medium"
            htmlFor="role"
          >
            Role / Title
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-2 px-4 font-medium text-[14px] text-[#121217] placeholder:text-[#B5B7BC] bg-[#E7E8E94D]/30"
            placeholder="e.g. Community Manager"
            id="role"
            type="text"
            aria-invalid={!!errors?.role}
            value={values.role}
            onChange={(e) => onChange("role", e.target.value)}
          />
          <FieldDescription className={errors?.role ? "text-error-500" : ""}>
            {errors?.role ?? "Optional."}
          </FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
