import Link from 'next/link';
import AboutUsSection from '@/components/ui/about-us-section';

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

      <section className="section section-no-padding">
        <AboutUsSection />
      </section>
    </div>
  );
}
