import { Metadata } from 'next';
import LegalLayout from '../components/legal-layout';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how we collect, use, and protect your data at Social Badge.',
};

const toc = [
  { id: 'data-collection', title: '1. Data collection' },
  { id: 'data-usage', title: '2. Data usage' },
  { id: 'data-storage', title: '3. Data storage' },
  { id: 'data-sharing', title: '4. Data sharing' },
  { id: 'user-rights', title: '5. User rights' },
  { id: 'cookies', title: '6. Cookies' },
  { id: 'security', title: '7. Security' },
  { id: 'contact', title: '8. Contact' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy"
      titleHighlight="Policy."
      date="1 May 2026"
      summary={
        <p>
          <strong className="font-semibold text-primary-800 dark:text-primary-300">
            Plain English summary:
          </strong>{' '}
          We only collect what we need to create your digital badge, use it with your consent, and
          keep it secure. You remain in control of your data at all times.
        </p>
      }
      toc={toc}
    >
      <section id="data-collection" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          1. Data we collect
        </h2>
        <p>We only collect the data necessary to provide you with a digital badge.</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              1.1 Participants
            </h3>
            <p>Your name, photo, and your email address or social media handle.</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              1.2 Organizers
            </h3>
            <p>Name, email, company or event details, and branding assets (e.g., logos).</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              1.3 Technical Data
            </h3>
            <p>
              IP address and browser type (collected automatically for security and analytics
              purposes).
            </p>
          </div>
        </div>
      </section>

      <section id="data-usage" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          2. How we use your data
        </h2>
        <p>We process your data based on your consent for the following purposes:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>To generate your personalized digital badge</li>
          <li>To display public badges on our &quot;Explore&quot; page</li>
          <li>
            To allow organizers to verify participants (if email-restricted access is enabled).
          </li>
          <li>To comply with legal obligations under the Cybercrimes Act of Nigeria.</li>
        </ul>
      </section>

      <section id="data-storage" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          3. Data storage & retention
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              3.1 Image processing
            </h3>
            <p>
              We do not store your original photo permanently. It is processed to create your badge
              and then deleted immediately.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              3.2 Data location
            </h3>
            <p>
              Your data may be stored on secure cloud servers. If these servers are located outside
              Nigeria, we ensure they meet the data protection standards required by the NDPC.
            </p>
          </div>
        </div>
      </section>

      <section id="data-sharing" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          4. Data sharing & third parties
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              4.1 Social media
            </h3>
            <p>
              When you use the &quot;Share&quot; feature, your badge may be sent to platforms such
              as X (Twitter), LinkedIn, or Instagram. These platforms operate under their own
              privacy policies.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              4.2 Organizers
            </h3>
            <p>
              If you join a private event, your name and email may be visible to the event
              organizer.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold font-fraunces text-foreground">
              4.3 No data sale
            </h3>
            <p>We do not sell your personal data or photos to third-party advertisers.</p>
          </div>
        </div>
      </section>

      <section id="user-rights" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          5. Your rights under the NDPA
        </h2>
        <p>As a Nigerian data subject, you have the right to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>Request a copy of the data we hold about you.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>
            Request deletion of your photo or badge from our services and &quot;Explore&quot; page.
          </li>
          <li>Withdraw your consent at any time (this may prevent you from generating a badge).</li>
        </ul>
      </section>

      <section id="cookies" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          6. Cookies & Tracking
        </h2>
        <p>
          We use cookies to remember your session and analyze site traffic. You can disable cookies
          through your browser settings.
        </p>
      </section>

      <section id="security" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          7. Security measures
        </h2>
        <p>
          We implement industry-standard encryption to protect your data during transmission.
          However, no method of transmission over the internet is completely secure, and we cannot
          guarantee absolute security.
        </p>
      </section>

      <section id="contact" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          8. Contact & disputes
        </h2>
        <p>
          If you have questions or wish to exercise your rights, please contact our Data Protection
          Officer (DPO).
        </p>

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