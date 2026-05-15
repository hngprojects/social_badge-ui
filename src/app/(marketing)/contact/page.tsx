import ContactHero from '../components/contact/contact-hero';
import ContactWays from '../components/contact/contact-ways';
import ContactForm from '../components/contact/contact-form';

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF]">
      <ContactHero />

      <section className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <ContactWays />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}