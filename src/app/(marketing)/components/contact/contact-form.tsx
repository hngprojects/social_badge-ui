'use client';

import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Enter a valid email address',
    }),
  subject: z.string().min(1, 'Please select a topic'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // TODO: wire to API
    console.log(data);
  };

  return (
    <div className="w-full lg:w-3/5 border border-[#EAEAE6] rounded-[14px] p-8 md:p-12">
      <div className="mb-5 gap-2.5 flex items-center">
        <div className="bg-primary rounded-full w-2 h-2 shrink-0" />
        <p className="text-[11px] font-light tracking-[1.54px] uppercase text-[#8A8A85]">
          Send a message
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl text-[#0A0A0A] font-fraunces font-semibold mb-10">
        We&apos;ll get back to you fast.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
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
              {...register('firstName')}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
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
              {...register('lastName')}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-[11px] tracking-widest uppercase text-[#8A8A85]">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="alex@yourcompany.com"
            aria-invalid={!!errors.email}
            className="h-12 text-base rounded-[12px] bg-[#F4F4F2] placeholder:text-[#757575] border-[#EAEAE6] aria-invalid:border-red-400"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="subject" className="text-[11px] tracking-widest uppercase text-[#8A8A85]">
            Subject
          </Label>
          <select
            id="subject"
            aria-invalid={!!errors.subject}
            className="h-12 w-full rounded-[12px] border border-[#EAEAE6] bg-[#F4F4F2] px-3 text-base text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-invalid:border-red-400"
            {...register('subject')}
          >
            <option value="">Select a topic...</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership</option>
            <option value="bug">Bug Report</option>
            <option value="feedback">Feedback</option>
            <option value="billing">Billing</option>
          </select>
          {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="message"
            className="text-[11px] tracking-widests uppercase text-[#8A8A85]"
          >
            Message
          </Label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell us what's on your mind. The more detail the better — we'll actually read it."
            aria-invalid={!!errors.message}
            className="resize-none w-full rounded-[12px] border border-[#EAEAE6] bg-[#F4F4F2] px-3 py-3 text-base placeholder:text-[#757575] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring aria-invalid:border-red-400"
            {...register('message')}
          />
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-base font-light mt-1 gap-2 disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          {!isSubmitting && (
            <Image src="/assets/icons/round-arrow-right-up.svg" alt="" width={20} height={20} />
          )}
        </Button>

        <p className="text-center text-sm text-[#8A8A85]">
          By submitting you agree to our{' '}
          <Link href="/privacy" className="text-[#FF4F1F]">
            Privacy Policy
          </Link>
          . We never share your data.
        </p>
      </form>
    </div>
  );
}