import InteractiveHoverButton from '@/components/ui/interactive-hover-button';

export const metadata = {
  title: 'Get Involved - Health Decoded',
};

export default function GetInvolvedPage() {
  return (
    <div className="get-involved-page">
      <section className="section">
        <h2>Get Involved</h2>
        <p className="section-subtitle">Join us in empowering youth through health education</p>
        <div className="involvement-grid">
          <div className="involvement-card">
            <div className="involvement-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                alt="Volunteers helping with community health education"
                className="involvement-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80";
                }}
              />
            </div>
            <h3>Volunteer</h3>
            <p>Join us in making health education accessible to all youth.</p>
            <InteractiveHoverButton
              href="https://forms.gle/oM3SsuVrcVV6xy8ZA"
              text="Get Started"
              classes="interactive-hover-button--feature involvement-card-button"
            />
          </div>
          <div className="involvement-card">
            <div className="involvement-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                alt="Peer ambassadors leading a workshop"
                className="involvement-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80";
                }}
              />
            </div>
            <h3>Become an Ambassador</h3>
            <p>Lead peer education workshops and advocate for health literacy.</p>
            <InteractiveHoverButton
              href="https://forms.gle/j8TqzZV3BYvd4kBb9"
              text="Get Started"
              classes="interactive-hover-button--feature involvement-card-button"
            />
          </div>
          <div className="involvement-card">
            <div className="involvement-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                alt="Students starting a new chapter"
                className="involvement-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80";
                }}
              />
            </div>
            <h3>Create a New Chapter</h3>
            <p>Start Health Decoded in your community or school.</p>
            <InteractiveHoverButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSe73_Eb1v4pqS0ps0mgwa3_s7vbcRY3ZdqqmQpmk5-90VvdCA/viewform?usp=publish-editor"
              text="Get Started"
              classes="interactive-hover-button--feature involvement-card-button"
            />
          </div>
          <div className="involvement-card">
            <div className="involvement-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80"
                alt="Organizations partnering together"
                className="involvement-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80";
                }}
              />
            </div>
            <h3>Partner With Us</h3>
            <p>Schools, organizations, and institutions - let&apos;s work together.</p>
            <InteractiveHoverButton
              href="https://forms.gle/Q9u3LFereNudSuF48"
              text="Get Started"
              classes="interactive-hover-button--feature involvement-card-button"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
