import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";

export function ProfileInput() {
  return (
    <FieldSet className="w-full text-[14px] font-normal text-[#B5B7BC]">
      <FieldGroup className="gap-[16px]">
        {/* FULL NAME */}
        <Field className="w-full gap-[8px]">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="fullname"
          >
            Full name
            <Asterisk className="w-[8px] h-auto text-error-500 font-medium tracking-normal leading-0" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-[8px] px-[16px] text-[14px] text-[#121217] placeholder:text-[#B5B7BC] font-medium bg-[#E7E8E94D]/30"
            id="fullname"
            type="text"
            placeholder="Andrew Smith"
          />
        </Field>
        {/* EMAIL ADDRESS*/}
        <Field className="w-full gap-[8px]">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-medium"
            htmlFor="email"
          >
            Email address
            <Asterisk className="w-[8px] h-auto text-error-500" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-[8px] px-[16px] text-[14px] text-[#121217] placeholder:text-[#B5B7BC] bg-[#E7E8E94D]/30"
            id="fullname"
            type="text"
            placeholder="Andresmith@achieverher.com"
          />
          <FieldDescription>
            Your email address cannot be changed
          </FieldDescription>
        </Field>
        {/* ROLE/TITLE*/}
        <Field className="w-full gap-[8px]">
          <FieldLabel
            className="w-full text-[#121217] gap-0 font-medium"
            htmlFor="email"
          >
            Role / Title
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-[8px] px-[16px] font-medium text-[14px] text-[#121217] bg-[#E7E8E94D]/30"
            id="fullname"
            type="text"
          />
          <FieldDescription>Optional.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
