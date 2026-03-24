import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Get Involved - Health Decoded',
};

export default function GetInvolvedPage() {
  return (
    <div className="get-involved-page">
      <section className="programs-features" aria-label="Get Involved">
        <div className="programs-features__header">
          <h2>Get Involved</h2>
          <p>Join us in empowering youth through health education</p>
        </div>

        <div className="programs-features__grid">
          <article className="programs-feature-card">
            <div className="programs-feature-card__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                alt="Volunteers helping with community health education"
                className="programs-feature-card__image"
                loading="lazy"
              />
            </div>
            <h3>Volunteer</h3>
            <p className="programs-feature-card__subtitle">Join the team</p>
            <p className="programs-feature-card__body">Join us in making health education accessible to all youth.</p>
            <div className="mt-8 pt-4">
              <Button href="https://forms.gle/oM3SsuVrcVV6xy8ZA" target="_blank">Get Started</Button>
            </div>
          </article>

          <article className="programs-feature-card">
            <div className="programs-feature-card__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Peer ambassadors leading a workshop"
                className="programs-feature-card__image"
                loading="lazy"
              />
            </div>
            <h3>Become an Ambassador</h3>
            <p className="programs-feature-card__subtitle">Lead your peers</p>
            <p className="programs-feature-card__body">Lead peer education workshops and advocate for health literacy in your area.</p>
            <div className="mt-8 pt-4">
              <Button href="https://forms.gle/j8TqzZV3BYvd4kBb9" target="_blank">Get Started</Button>
            </div>
          </article>

          <article className="programs-feature-card">
            <div className="programs-feature-card__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                alt="Students starting a new chapter"
                className="programs-feature-card__image"
                loading="lazy"
              />
            </div>
            <h3>Create a New Chapter</h3>
            <p className="programs-feature-card__subtitle">Expand the reach</p>
            <p className="programs-feature-card__body">Start Health Decoded in your local community, university or school.</p>
            <div className="mt-8 pt-4">
              <Button href="https://docs.google.com/forms/d/e/1FAIpQLSe73_Eb1v4pqS0ps0mgwa3_s7vbcRY3ZdqqmQpmk5-90VvdCA/viewform?usp=publish-editor" target="_blank">Get Started</Button>
            </div>
          </article>

          <article className="programs-feature-card">
            <div className="programs-feature-card__image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80"
                alt="Organizations partnering together"
                className="programs-feature-card__image"
                loading="lazy"
              />
            </div>
            <h3>Partner With Us</h3>
            <p className="programs-feature-card__subtitle">Organizations</p>
            <p className="programs-feature-card__body">Schools, organizations, and institutions - let&apos;s work together.</p>
            <div className="mt-8 pt-4">
              <Button href="https://forms.gle/Q9u3LFereNudSuF48" target="_blank">Get Started</Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
