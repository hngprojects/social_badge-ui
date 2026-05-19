import WaitlistHero from '@/app/(marketing)/components/waitlist/waitlist-hero';
import ThreeSteps from '@/app/(marketing)/components/waitlist/three-steps';
import CommunityBenefits from '@/app/(marketing)/components/waitlist/community-benefits';
import Footer from '@/components/layout/footer';


export default function LandingPage() {
  return (
    <div>
      <WaitlistHero />
      <ThreeSteps />
      <CommunityBenefits />
      <Footer />
    </div>
  );
}
