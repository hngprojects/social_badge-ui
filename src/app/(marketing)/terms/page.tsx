import { Metadata } from 'next';
import LegalLayout from '../components/legal-layout';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Flare Tag.',
};

import { toc } from '../constants/terms';

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
          Use Flare Tag for legitimate events and communities. Don&apos;t upload illegal or harmful
          content. You own your designs. We can suspend accounts that abuse the platform.
        </p>
      }
      toc={toc}
    >
      <section id="acceptance" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          1. Acceptance of terms
        </h2>
        <div className="flex flex-col gap-2">
          <p>
            By creating an account or using Flare Tag (badge.build), you agree to these Terms of Service
            (&quot;Terms&quot;). If you are using Flare Tag on behalf of an organisation, you
            represent that you have authority to bind that organisation to these Terms.
          </p>
          <p>
            These Terms form a binding contract between you and Badge Build Ltd. If you do not
            agree, do not use the service.
          </p>
        </div>
      </section>

      <section id="the-service" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">2. The service</h2>
        <div className="flex flex-col gap-2">
          <p>
            Flare Tag is a self-serve web platform that enables event organisers to create
            branded digital badge templates and enables participants to personalise and share those
            badges. We reserve the right to modify, suspend, or discontinue any part of the service
            at any time with reasonable notice.
          </p>
          <p>
            We aim for 99.5% uptime. Scheduled maintenance will be communicated at least 48 hours
            in advance. We are not liable for losses caused by downtime.
          </p>
        </div>
      </section>

      <section id="accounts" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">3. Accounts</h2>
        <div className="flex flex-col gap-2">
          <p>
            You must be at least 16 years old to create an account. You are responsible for
            maintaining the security of your account credentials. You must notify us immediately of
            any suspected unauthorised use.
          </p>
          <p>
            One person may not maintain multiple free accounts. Accounts created in bad faith (to
            circumvent limits, engage in spam, or other abuse) will be terminated.
          </p>
        </div>
      </section>

      <section id="acceptable-use" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          4. Acceptable use
        </h2>
        <p>You may not use Flare Tag to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>
            Create, distribute, or promote content that is illegal, harmful, threatening, abusive,
            or discriminatory
          </li>
          <li>Impersonate another person or organisation</li>
          <li>Upload malware or other malicious code</li>
          <li>
            Harvest email addresses or other personal data from participants without consent
          </li>
          <li>Circumvent access controls, rate limits, or other security measures</li>
          <li>Use the platform for unsolicited commercial messages (spam)</li>
          <li>Create badges that infringe third-party intellectual property rights</li>
        </ul>
        <p>Violations may result in immediate account suspension without refund.</p>
      </section>

      <section id="content-and-ip" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          5. Content ownership &amp; intellectual property
        </h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">5.1 Your content</h3>
            <p>
              You retain full ownership of the templates, logos, and content you upload to Social
              Badge. By uploading content, you grant us a non-exclusive, worldwide, royalty-free
              licence to store, display, and process it solely to provide the service.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">5.2 Our platform</h3>
            <p>
              Flare Tag&apos;s platform, code, design, and documentation are owned by Badge
              Build Ltd and protected by copyright. You may not copy, reverse-engineer, or create
              derivative works without our written permission.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-foreground">5.3 Explore page</h3>
            <p>
              By making a template public on the Explore page, you grant other users the right to
              use that template to generate personal badges for non-commercial event promotion. You
              retain all other rights.
            </p>
          </div>
        </div>
      </section>

      <section id="payments" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          6. Payments and refunds
        </h2>
        <div className="flex flex-col gap-2">
          <p>
            Subscription fees are charged at the start of each billing period. One-time Event fees
            are charged at purchase. All prices are in USD and exclude applicable taxes.
          </p>
          <p>
            We offer a 14-day money-back guarantee for first-time Pro subscribers. Refunds are not
            available after 14 days or for Event access that has been used. To request a refund,
            contact{' '}
            <a
              href="mailto:billing@badge.build"
              className="text-primary hover:text-primary-600 transition-colors"
            >
              billing@badge.build
            </a>
            .
          </p>
          <p>
            We reserve the right to adjust pricing with 30 days&apos; notice for existing
            subscribers.
          </p>
        </div>
      </section>

      <section id="termination" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">7. Termination</h2>
        <div className="flex flex-col gap-2">
          <p>
            You may delete your account at any time via Account Settings → Delete Account. We will
            process deletion within 30 days.
          </p>
          <p>
            We may terminate or suspend your account immediately if you violate these Terms, engage
            in fraud, or if we are required to do so by law. In all other cases, we will provide 30
            days&apos; notice.
          </p>
        </div>
      </section>

      <section id="liability" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          8. Limitation of liability
        </h2>
        <div className="flex flex-col gap-2">
          <p>
            To the maximum extent permitted by law, Badge Build Ltd shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of Social
            Badge. Our total liability to you shall not exceed the fees you paid to us in the three
            months preceding the claim.
          </p>
          <p>
            Flare Tag is provided &quot;as is&quot;. We make no warranties, express or implied,
            about fitness for a particular purpose or uninterrupted service.
          </p>
        </div>
      </section>

      <section id="governing-law" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          9. Governing law
        </h2>
        <div className="flex flex-col gap-2">
          <p>
            These Terms are governed by and construed in accordance with the laws of the Federal
            Republic of Nigeria. Disputes shall be subject to the exclusive jurisdiction of the
            courts of Lagos State, Nigeria.
          </p>
          <p>
            If you are a consumer in the EU, you may also benefit from mandatory consumer
            protection laws in your country of residence.
          </p>
        </div>
      </section>

      <section id="changes" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          10. Changes to these terms
        </h2>
        <p>
          We may update these Terms to reflect changes in our service, legal requirements, or
          business practices. We will notify you by email at least 14 days before material changes
          take effect. Continued use of the service after that date constitutes acceptance.
        </p>
      </section>

      <section id="contact" className="scroll-mt-32 flex flex-col gap-2">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">11. Contact</h2>
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
          <p>Badge Build Ltd, 14 Victoria Island, Lagos, Nigeria.</p>
        </div>
      </section>
    </LegalLayout>
  );
}
