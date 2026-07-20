// Privacy policy: static content page, reuses the same eyebrow/heading/card
// shell and .news-post-body typography as the news post detail page.
export const metadata = {
  title: 'Privacy Policy',
};

const CONTACT_EMAIL = 'ryanp@healthdecodedinitiative.org';

export default function PrivacyPolicyPage() {
  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Health Decoded</p>
        <h1 className="hd-app-heading">Privacy Policy</h1>
        <p className="hd-app-subtitle">Last updated: July 20, 2026</p>

        <div className="hd-app-card news-post-body">
          <p>
            Health Decoded (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is a youth-focused
            health literacy nonprofit. This policy explains what information we collect through
            healthdecodedinitiative.org and our ambassador/volunteer platform, and how we use it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you sign in with Google, we receive your name, email address, and profile picture
            from your Google account. If you sign in via magic link instead, we collect only the
            email address you provide.
          </p>
          <p>When you use the platform, we also collect:</p>
          <ul>
            <li>Profile information you provide (school or organization, role as ambassador or volunteer)</li>
            <li>Event registrations (which events you sign up for and attend)</li>
            <li>Activity within the platform (actions like registering for events, tied to your account)</li>
          </ul>
          <p>
            We do not collect payment information, government ID numbers, or any sensitive personal
            data beyond what&apos;s listed above.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use this information to:</p>
          <ul>
            <li>Create and maintain your account</li>
            <li>Let you register for and track events</li>
            <li>Show you your own activity and registration history on your dashboard</li>
            <li>Operate and improve the platform</li>
          </ul>
          <p>
            We do not sell your information, and we do not share it with third parties for
            advertising or marketing purposes.
          </p>

          <h2>Who We Share Information With</h2>
          <p>We share information only with the service providers that run our infrastructure:</p>
          <ul>
            <li><strong>Supabase</strong> (authentication and database hosting)</li>
            <li><strong>Vercel</strong> (website hosting)</li>
            <li><strong>Google</strong> (sign-in authentication, if you choose that option)</li>
          </ul>
          <p>
            These providers process data on our behalf and are bound by their own privacy and
            security commitments; we don&apos;t share your information with anyone else.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Health Decoded&apos;s programs are designed for youth, and some users of this platform
            may be minors. We do not knowingly collect more information from a child than is
            necessary for them to participate as an ambassador or volunteer (name, email,
            school/organization, and event activity). Parents or guardians with questions or
            concerns about a minor&apos;s information can contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> at any time, including to
            request that we delete their child&apos;s data.
          </p>

          <h2>Data Retention and Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of your information at any time
            by contacting <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We retain
            account and activity data for as long as your account is active, or as needed to
            fulfill the purposes described above.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy as the platform evolves. We&apos;ll update the &ldquo;Last
            updated&rdquo; date above when we do.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy or your data:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
