import Link from 'next/link';
import TeamSectionBlock from '@/components/ui/team-section-block-shadcnui';

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

      <section className="section section-no-padding">
        <TeamSectionBlock />
      </section>
    </div>
  );
}
