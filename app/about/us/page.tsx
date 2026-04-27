// About Us page: renders the shared about-section subnav and the animated AboutUsSection with mission, services grid, stat counters, and CTA banner.
import Link from 'next/link';
import AboutUsSection from '@/components/ui/about-us-section';
import { FadeInSection } from '@/components/motion/fade-in-section';

export const metadata = {
  title: 'About Us - Health Decoded',
};

export default function AboutUsPage() {
  return (
    <div className="about-page">
      <div className="subnav">
        <Link href="/about/us" className="subnav-link active">About Us</Link>
        <Link href="/about/story" className="subnav-link">Our Story</Link>
        <Link href="/about/team" className="subnav-link">Our Team</Link>
      </div>

      <FadeInSection as="div" className="section section-no-padding" delay={0}>
        <AboutUsSection />
      </FadeInSection>
    </div>
  );
}
