import { Metadata } from 'next';
import LegalLayout from '../components/legal-layout';

export const metadata: Metadata = {
  title: 'Data & Cookies',
  description: 'Learn how Flare Tag uses cookies and similar technologies.',
};

import { toc } from '../constants/cookies';

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Data &"
      titleHighlight="Cookies."
      date="May 2026"
      dateLabel="Last updated"
      summary={
        <p>
          <strong className="font-semibold text-primary-800 dark:text-primary-300">
            What are cookies?
          </strong>{' '}
          Cookies are small text files that a website stores in your browser. They help websites
          remember things between page loads — like whether you are signed in.
        </p>
      }
      toc={toc}
    >
      <section id="acceptance" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          How Flare Tag Uses Cookies
        </h2>
        <p>
          Flare Tag sets one cookie. That is it. We do not use advertising cookies, analytics
          cookies, or any form of behavioural tracking.
        </p>
      </section>

      <section id="the-service" className="scroll-mt-32 flex flex-col gap-6">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          The Cookie We Set
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Name</th>
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Purpose</th>
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Duration</th>
                <th className="text-left py-2 font-semibold text-foreground">Who Receives It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 pr-6 align-top font-mono text-xs">refresh_token</td>
                <td className="py-3 pr-6 align-top">
                  Keeps signed-in organisers logged in across page reloads
                </td>
                <td className="py-3 pr-6 align-top">7 days, or until sign-out</td>
                <td className="py-3 align-top">Signed-in organisers only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4">
          <p>
            <strong className="font-semibold text-foreground">What this cookie contains:</strong>{' '}
            The refresh_token cookie holds a secure token that identifies your session. It contains
            only your internal account identifier, an expiry timestamp, and a unique token ID. It
            does not contain your name, email address, or any other personal information.
          </p>

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-foreground">Technical attributes:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-6 font-semibold text-foreground">
                      Attribute
                    </th>
                    <th className="text-left py-2 font-semibold text-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">HttpOnly</td>
                    <td className="py-2">Yes — cannot be read by JavaScript</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">Secure</td>
                    <td className="py-2">Yes — transmitted over HTTPS only</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">SameSite</td>
                    <td className="py-2">Lax — protected against cross-site request forgery</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6">Expires</td>
                    <td className="py-2">7 days from sign-in</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p>
            <strong className="font-semibold text-foreground">Type:</strong> Strictly necessary
          </p>

          <p>
            <strong className="font-semibold text-foreground">Can you turn it off?</strong> This
            cookie is required for you to stay signed in. Disabling it means you will be logged out
            every time you reload the page.
          </p>
        </div>
      </section>

      <section id="accounts" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          If You Are a Participant
        </h2>
        <p>
          If you are generating a badge — not managing templates —{' '}
          <strong className="font-semibold text-foreground">
            no cookies are set on your device at all.
          </strong>{' '}
          You access Flare Tag without signing in, and nothing is stored in your browser.
        </p>
      </section>

      <section id="acceptable-use" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          Do We Need Your Consent for Cookies?
        </h2>
        <p>
          No. The one cookie we set is strictly necessary for the platform to function. Under
          applicable data protection regulations, strictly necessary cookies do not require a consent
          banner or prior approval.
        </p>
      </section>

      <section id="content-and-ip" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          Cookies We Do Not Use
        </h2>
        <p>To be explicit:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>No advertising or marketing cookies</li>
          <li>No analytics or behavioural tracking cookies</li>
          <li>No third-party tracking cookies</li>
          <li>No cookies used to build a profile of you for any purpose</li>
        </ul>
      </section>

      <section id="payments" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          Third-Party Services
        </h2>
        <p>
          Flare Tag works with the following third-party services that may process your data as
          part of delivering the platform. These are processors only — they do not receive your data
          for their own purposes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-6 font-semibold text-foreground">Third Party</th>
                <th className="text-left py-2 pr-6 font-semibold text-foreground">
                  What Is Shared
                </th>
                <th className="text-left py-2 font-semibold text-foreground">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 align-top">Google</td>
                <td className="py-3 pr-6 align-top">
                  Your name, email address, and profile photo URL
                </td>
                <td className="py-3 align-top">To sign you in via Google OAuth</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 pr-6 align-top">Cloudinary</td>
                <td className="py-3 pr-6 align-top">
                  Logos you upload, photos used in badge generation, generated badge images
                </td>
                <td className="py-3 align-top">Image storage and delivery</td>
              </tr>
              <tr>
                <td className="py-3 pr-6 align-top">Resend</td>
                <td className="py-3 pr-6 align-top">Your email address</td>
                <td className="py-3 align-top">
                  To send transactional emails related to your account
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>No data is shared with advertising networks, data brokers, or analytics platforms.</p>
      </section>

      <section id="termination" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          Your Rights Under the NDPR
        </h2>
        <p>Under the Nigeria Data Protection Regulation (NDPR), you have the right to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>Know what personal data we hold about you and why</li>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent where consent is the basis for processing</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a
            href="mailto:privatesocialbadge@gmail.com"
            className="text-primary hover:text-primary-600 transition-colors"
          >
            privatesocialbadge@gmail.com
          </a>
          .
        </p>
      </section>

      <section id="liability" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          How to Manage Cookies
        </h2>
        <p>You can manage or delete cookies through your browser settings:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-muted-foreground">
          <li>
            <strong className="font-semibold text-foreground">Chrome:</strong> Settings &rarr;
            Privacy and Security &rarr; Cookies and other site data
          </li>
          <li>
            <strong className="font-semibold text-foreground">Safari:</strong> Settings &rarr;
            Safari &rarr; Privacy &amp; Security
          </li>
          <li>
            <strong className="font-semibold text-foreground">Firefox:</strong> Settings &rarr;
            Privacy &amp; Security &rarr; Cookies and Site Data
          </li>
          <li>
            <strong className="font-semibold text-foreground">Edge:</strong> Settings &rarr;
            Cookies and site permissions
          </li>
        </ul>
        <p>Note that deleting the refresh_token cookie will sign you out of Flare Tag.</p>
      </section>

      <section id="governing-law" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">
          Changes to This Policy
        </h2>
        <p>
          If our cookie use changes — for example if we add new features that introduce new cookies
          — we will update this page and revise the date at the top before those changes go live.
        </p>
      </section>

      <div id="changes" className="scroll-mt-32" />
      <section id="contact" className="scroll-mt-32 flex flex-col gap-4">
        <h2 className="text-[28px] font-semibold font-fraunces text-foreground">Contact</h2>
        <p>
          Questions about this policy? Reach us at{' '}
          <a
            href="mailto:privatesocialbadge@gmail.com"
            className="text-primary hover:text-primary-600 transition-colors"
          >
            privatesocialbadge@gmail.com
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
