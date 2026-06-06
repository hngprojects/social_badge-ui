"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { ContactFormValues } from "../../types/contact";
import {
  getContactErrorMessage,
  useContactMessage,
} from "../../hooks/useContactMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MESSAGE_MAX_LENGTH = 500;

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Enter a valid email address",
    }),
  subject: z.string().min(1, "Please select a topic"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(
      MESSAGE_MAX_LENGTH,
      `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters`,
    ),
});

export default function ContactForm() {
  const { sendContactMessage, isLoading } = useContactMessage();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const messageValue = useWatch({ control, name: "message" });
  const messageLength = messageValue?.length ?? 0;
  const isMessageTooShort = messageLength < 10;
  const isSubmitDisabled = isSubmitting || isLoading || isMessageTooShort;

  const onSubmit = (data: ContactFormValues) => {
    setStatus({ type: null, message: "" });

    sendContactMessage(data, {
      onSuccess: () => {
        reset();
        setStatus({
          type: "success",
          message: "Message sent successfully!",
        });
      },
      onError: (error) => {
        setStatus({
          type: "error",
          message: getContactErrorMessage(error),
        });
      },
    });
  };

  if (status.type === "success") {
    return (
      <div className="w-full lg:w-3/5 border border-[#EAEAE6] rounded-[24px] p-8 md:p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[380px]">
        <Image
          width={56}
          height={56}
          alt=""
          src={`/assets/icons/check-icon.svg`}
          className="w-auto h-auto"
        />

        <div className="space-y-3">
          <h2 className="text-lg sm:text-[22px] leading-[24px] font-bold text-[#3A3A3A]">
            Got it. We&apos;ll be in touch
          </h2>

          <p className="text-[#8A8A85] text-sm sm:text-md max-w-[454px] leading-[24px]">
            Your message is in. Expect a reply within one business day — usually
            sooner.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full max-w-[454px] items-center gap-4">
          <button
            onClick={() =>
              setStatus({
                type: null,
                message: "",
              })
            }
            className="px-6 py-3 flex items-center justify-center gap-2 w-full rounded-full bg-[#F4F4F2]"
          >
            <span>
              {" "}
              <Image
                width={20}
                height={20}
                alt=""
                src={`/assets/icons/ui-arrow-left.svg`}
                className="w-auto h-auto"
              />
            </span>
            Back
          </button>

          <Link
            href="/explore"
            className="px-2 py-3 flex items-center gap-2 justify-center rounded-full w-full text-md bg-[#3A3A3A] text-white"
          >
            Explore Templates
            <span>
              {" "}
              <Image
                width={16}
                height={16}
                alt=""
                src={`/assets/icons/ui-arrow-right.svg`}
                className="w-auto h-auto"
              />
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full lg:w-3/5 border border-[#EAEAE6] rounded-[14px] p-8 md:p-12`}
    >
      <div className="mb-5 gap-2.5 flex items-center">
        <div className="bg-primary rounded-full w-2 h-2 shrink-0" />
        <p className="text-[11px] font-light tracking-[1.54px] uppercase text-[#8A8A85]">
          Send a message
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl text-[#0A0A0A] font-fraunces font-semibold mb-10">
        We&apos;ll get back to you fast.
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* First / Last name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="firstName"
              className="text-[11px] tracking-widest uppercase text-[#8A8A85]"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Alex"
              aria-invalid={!!errors.firstName}
              className="h-12 text-base rounded-[12px] bg-[#F4F4F2] placeholder:text-[#757575] border-[#EAEAE6] aria-invalid:border-red-400"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="lastName"
              className="text-[11px] tracking-widest uppercase text-[#8A8A85]"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Rivera"
              aria-invalid={!!errors.lastName}
              className="h-12 text-base rounded-[12px] bg-[#F4F4F2] placeholder:text-[#757575] border-[#EAEAE6] aria-invalid:border-red-400"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="email"
            className="text-[11px] tracking-widest uppercase text-[#8A8A85]"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="alex@yourcompany.com"
            aria-invalid={!!errors.email}
            className="h-12 text-base rounded-[12px] bg-[#F4F4F2] placeholder:text-[#757575] border-[#EAEAE6] aria-invalid:border-red-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="subject"
            className="text-[11px] tracking-widest uppercase text-[#8A8A85]"
          >
            Subject
          </Label>
          <Controller
            control={control}
            name="subject"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="subject"
                  aria-invalid={!!errors.subject}
                  className="h-12 p-6 w-full rounded-[12px] border-[#EAEAE6] bg-[#F4F4F2] text-base aria-invalid:border-red-400"
                >
                  <SelectValue placeholder="Select a topic..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="bug_report">Bug Report</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && (
            <p className="text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="message"
            className="text-[11px] tracking-widests uppercase text-[#8A8A85]"
          >
            Message
          </Label>
          <Textarea
            id="message"
            rows={6}
            wrap="soft"
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Tell us what's on your mind. The more detail the better — we'll actually read it."
            aria-invalid={!!errors.message}
            className="field-sizing-fixed block h-[144px] min-h-[144px] max-h-[144px] w-full min-w-0 max-w-full flex-none resize-none overflow-x-hidden overflow-y-auto rounded-[12px] border-[#EAEAE6] bg-[#F4F4F2] text-lg break-words whitespace-pre-wrap [field-sizing:fixed] [overflow-wrap:anywhere] md:text-lg placeholder:text-[#757575] aria-invalid:border-red-400"
            {...register("message")}
          />
          <div className="flex items-start justify-between gap-3">
            {errors.message ? (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            ) : (
              <p className="text-xs text-[#8A8A85]">
                Message should not exceed {MESSAGE_MAX_LENGTH} characters.
              </p>
            )}
            <p className="shrink-0 text-xs text-[#8A8A85]">
              {messageLength}/{MESSAGE_MAX_LENGTH}
            </p>
          </div>
        </div>

        {status.type === "error" && (
          <p className="text-red-500 text-sm mt-2">{status.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full h-14 text-base cursor-pointer font-light mt-1 gap-2 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting || isLoading ? "Sending..." : "Send Message"}
          {!isSubmitting && !isLoading && (
            <Image
              src="/assets/icons/round-arrow-right-up.svg"
              alt=""
              width={20}
              height={20}
              className="w-auto h-auto"
            />
          )}
        </Button>

        <p className="text-center text-sm text-[#8A8A85]">
          By submitting you agree to our{" "}
          <Link href="/privacy" className="text-[#FF4F1F]">
            Privacy Policy
          </Link>
          . We never share your data.
        </p>
      </form>
    </div>
  );
}
