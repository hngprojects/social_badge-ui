import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Asterisk } from "lucide-react";

export default function InputSecurity() {
  return (
    <FieldSet className="w-full text-[14px] font-normal py-0 text-[#B5B7BC]">
      <FieldGroup>
        {/* FULL NAME */}
        <Field className="w-full gap-[8px]">
          <FieldLabel
            className="w-full text-[#3A3A3A] gap-0 font-normal"
            htmlFor="fullname"
          >
            Full name
            <Asterisk className="w-[8px] h-auto text-error-500" />
          </FieldLabel>
          <Input
            className="w-full rounded-[8px] py-[8px] px-[16px] text-[14px] text-[#B5B7BC] bg-[#E7E8E94D]/30"
            id="fullname"
            type="text"
            placeholder="Peter Obi"
          />
          <FieldDescription>
            Choose a unique fullname for your account.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
