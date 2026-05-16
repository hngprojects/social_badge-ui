import { Metadata } from 'next';
import LegalLayout from '../components/legal-layout';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Social Badge.',
};

const toc = [
  { id: 'using-our-platform', title: '1. Using our platform' },
  { id: 'user-content', title: '2. User content' },
  { id: 'acceptable-use', title: '3. Acceptable use' },
  { id: 'service-availability', title: '4. Service availability & changes' },
  { id: 'intellectual-property', title: '5. Intellectual property' },
  { id: 'limitation-of-liability', title: '6. Limitation of liability' },
  { id: 'governing-law', title: '7. Governing law' },
  { id: 'changes-to-terms', title: '8. Changes to these terms' },
  { id: 'contact-us', title: '9. Contact us' },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of"
      titleHighlight="Service."
      date="1 May 2026"
      summary={
        <p>
          <strong className="font-semibold text-primary-800 dark:text-primary-300">
            Plain English summary:
          </strong>{' '}
          These terms are here to protect both you and us. We provide the badge-building platform;
          you provide the content (logos, images, etc.). Don&apos;t use our platform for anything
          illegal or harmful.
        </p>
      }
      toc={toc}
    >
      <section id="using-our-platform" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          1. Using our platform
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            By accessing or using Social Badge, you agree to comply with these terms and all
            applicable laws. You must be at least 18 years old (or the legal age of majority in your
            jurisdiction) to create an organizer account.
          </p>
          <p>
            If you are under 18, you may only use our services to generate a badge with the consent
            of a parent or guardian.
          </p>
        </div>
      </section>

      <section id="user-content" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">2. User content</h2>
        <div className="flex flex-col gap-4">
          <p>
            &quot;User Content&quot; refers to any logos, images, text, or other materials you
            upload to Social Badge.
          </p>
          <p>
            You retain ownership of your User Content. By uploading it, you grant us a
            non-exclusive, worldwide, royalty-free license to use, reproduce, and display it solely
            for the purpose of providing our services.
          </p>
          <p>
            You represent and warrant that you have all necessary rights to upload your User Content
            and that it does not infringe on the rights of any third party.
          </p>
        </div>
      </section>

      <section id="acceptable-use" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          3. Acceptable use
        </h2>
        <p>You agree not to use our platform to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>
            Upload any content that is unlawful, harmful, threatening, abusive, harassing,
            defamatory, vulgar, obscene, or otherwise objectionable.
          </li>
          <li>
            Impersonate any person or entity, or falsely state or otherwise misrepresent your
            affiliation with a person or entity.
          </li>
          <li>
            Interfere with or disrupt our services or servers or networks connected to our services.
          </li>
          <li>Attempt to gain unauthorized access to any part of our platform.</li>
          <li>
            Engage in any scraping, data mining, or similar data gathering or extraction methods.
          </li>
        </ul>
        <p>
          We reserve the right to remove any User Content and terminate the accounts of users who
          violate these rules.
        </p>
      </section>

      <section id="service-availability" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          4. Service availability & changes
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            We strive to keep Social Badge available at all times, but we may need to perform
            maintenance or updates that could cause temporary interruptions. We do not guarantee
            that our services will be uninterrupted or error-free.
          </p>
          <p>
            We reserve the right to modify or discontinue any part of our platform at any time, with
            or without notice.
          </p>
        </div>
      </section>

      <section id="intellectual-property" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          5. Intellectual property
        </h2>
        <p>
          The Social Badge platform, including its design, code, and branding, is owned by Badge
          Build Ltd. and is protected by copyright and other intellectual property laws. You may not
          use our branding without our prior written consent.
        </p>
      </section>

      <section id="limitation-of-liability" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          6. Limitation of liability
        </h2>
        <p>
          To the maximum extent permitted by law, Badge Build Ltd. shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits
          or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
          or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>Your access to or use of or inability to access or use the platform.</li>
          <li>Any conduct or content of any third party on the platform.</li>
          <li>Any unauthorized access, use, or alteration of your transmissions or content.</li>
        </ul>
        <p>
          In no event shall our aggregate liability exceed the amount you paid us, if any, in the
          past 12 months for the services giving rise to the claim.
        </p>
      </section>

      <section id="governing-law" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          7. Governing law
        </h2>
        <div className="flex flex-col gap-4">
          <p>
            These terms shall be governed by and construed in accordance with the laws of the
            Federal Republic of Nigeria, without regard to its conflict of law principles.
          </p>
          <p>
            Any dispute arising out of or relating to these terms or our services shall be resolved
            exclusively in the courts located in Lagos, Nigeria.
          </p>
        </div>
      </section>

      <section id="changes-to-terms" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          8. Changes to these terms
        </h2>
        <p>
          We may update these Terms of Service from time to time. If we make material changes, we
          will notify you by email or by posting a prominent notice on our platform. Your continued
          use of Social Badge after the effective date of the changes constitutes your acceptance of
          the updated terms.
        </p>
      </section>

      <section id="contact-us" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">9. Contact us</h2>
        <p>If you have any questions about these Terms of Service, please contact us.</p>

        <div className="flex flex-col gap-1">
          <p>
            For legal queries:{' '}
            <a
              href="mailto:legal@badge.build"
              className="text-primary hover:text-primary-600 transition-colors"
            >
              legal@badge.build
            </a>
          </p>
          <p>
            For general support:{' '}
            <Link href="/contact" className="text-primary hover:text-primary-600 transition-colors">
              contact page
            </Link>
          </p>
          <p>Badge Build Ltd. 14 Victoria Island, Lagos, Nigeria</p>
        </div>
      </section>
    </LegalLayout>
  );
}