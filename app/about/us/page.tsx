// About Us page: animated AboutUsSection, then a static "Groups We Work With" section.
import Link from 'next/link';
import AboutUsSection from '@/components/ui/about-us-section';
import { FadeInSection } from '@/components/motion/fade-in-section';

export const metadata = {
  title: 'About Us',
};

const PARTNER_GROUPS = [
  {
    name: 'Robert Wood Johnson University Hospital',
    short: 'RWJ',
    description: 'Collaborating on health education outreach and community programs.',
  },
  {
    name: "St. Peter's University Hospital",
    short: "St. Peter's",
    description: 'Partnering to bring health literacy resources to youth in Central Jersey.',
  },
  {
    name: 'Rutgers Collaborative Learning Center',
    short: 'Rutgers CLC',
    description: 'Working together to develop curriculum and reach Rutgers students and community members.',
  },
  {
    name: 'New Brunswick Public Schools',
    short: 'NBPS',
    description: 'Bringing Health Decoded workshops directly into New Brunswick classrooms.',
  },
];

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

      {/* Groups We Work With */}
      <FadeInSection as="section" className="section" delay={0.1} aria-labelledby="partners-heading">
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 32px' }}>
          <p className="hd-app-eyebrow">Community</p>
          <h2 id="partners-heading" className="hd-app-heading" style={{ marginBottom: 8 }}>
            Groups We Work With
          </h2>
          <p className="hd-app-subtitle">
            We collaborate with healthcare systems, universities, and school districts to bring health literacy where it&apos;s needed most.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 8,
          }}>
            {PARTNER_GROUPS.map((group) => (
              <div
                key={group.short}
                style={{
                  border: '1px solid var(--st-rule)',
                  borderRadius: 6,
                  padding: '24px 20px',
                  background: 'var(--st-bg)',
                }}
              >
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--st-accent)',
                  marginBottom: 6,
                }}>
                  {group.short}
                </div>
                <div style={{
                  fontFamily: 'var(--f-disp)',
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'var(--st-black)',
                  marginBottom: 8,
                  lineHeight: 1.25,
                }}>
                  {group.name}
                </div>
                <p style={{ fontSize: 13, color: 'var(--st-muted)', lineHeight: 1.55, margin: 0 }}>
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
