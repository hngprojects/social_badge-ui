import BenefitSection from './components/landingPage/benefits-section';
import FAQ from './components/landingPage/faq-section';
import Feature from './components/landingPage/features-section';
import HashScroll from './components/landingPage/hash-scroll';
import Hero from './components/landingPage/hero-section';
import Templates from './components/landingPage/templates-section';
import Testimonials from './components/landingPage/testimonials-section';
import TrustedBy from './components/landingPage/trusted-by-section';
import TryItNow from './components/landingPage/try-it-now-section';

export default function LandingPage() {
  return (
    <div>
      <HashScroll/>
      <Hero />
      <TrustedBy />
      <Feature />
      <TryItNow />
      <BenefitSection />
      <Templates />
      <Testimonials />
      <FAQ />
    </div>
  );
}