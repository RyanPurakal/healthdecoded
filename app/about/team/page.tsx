// Our Team page: renders the subnav and the TeamSectionBlock that displays each leadership member's card with 3D tilt effects and email links.
import Link from 'next/link';
import TeamSectionBlock from '@/components/ui/team-section-block-shadcnui';
import { FadeInSection } from '@/components/motion/fade-in-section';

export const metadata = {
  title: 'Our Team - Health Decoded',
};

export default function OurTeamPage() {
  return (
    <div className="about-page">
      <div className="subnav">
        <Link href="/about/us" className="subnav-link">About Us</Link>
        <Link href="/about/story" className="subnav-link">Our Story</Link>
        <Link href="/about/team" className="subnav-link active">Our Team</Link>
      </div>

      <FadeInSection as="div" className="section section-no-padding" delay={0}>
        <TeamSectionBlock />
      </FadeInSection>
    </div>
  );
}
