// Terms of Service: static content page, same shell/pattern as /privacy.
export const metadata = {
  title: 'Terms of Service',
};

const CONTACT_EMAIL = 'ryanp@healthdecodedinitiative.org';

export default function TermsOfServicePage() {
  return (
    <div className="hd-app-page">
      <div className="hd-app-container hd-app-container--narrow">
        <p className="hd-app-eyebrow">Health Decoded</p>
        <h1 className="hd-app-heading">Terms of Service</h1>
        <p className="hd-app-subtitle">Last updated: July 20, 2026</p>

        <div className="hd-app-card news-post-body">
          <p>
            Welcome to Health Decoded. These Terms of Service (&ldquo;Terms&rdquo;) govern your use
            of healthdecodedinitiative.org and our ambassador/volunteer platform (together, the
            &ldquo;Service&rdquo;), operated by Health Decoded, a youth-focused health literacy
            nonprofit (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;).
          </p>
          <p>
            By creating an account or using the Service, you agree to these Terms. If you
            don&apos;t agree, please don&apos;t use the Service.
          </p>

          <h2>Who Can Use the Service</h2>
          <p>
            The Service is designed for youth, and many of our ambassadors and volunteers are
            minors. If you are under 18, you should review these Terms with a parent or guardian
            before creating an account. By creating an account, you (or your parent/guardian on
            your behalf) confirm that you&apos;re permitted to participate in Health Decoded&apos;s
            programs.
          </p>

          <h2>Your Account</h2>
          <p>
            You&apos;re responsible for the accuracy of the information in your profile (name,
            school/organization, grade, and any other details you provide). You&apos;re
            responsible for keeping your Google account (used to sign in) secure; we don&apos;t
            collect or store passwords directly.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Create an account using another person&apos;s identity</li>
            <li>Share your account access with someone else</li>
            <li>Use the Service for anything unrelated to Health Decoded&apos;s programs (event registration, accessing resources, platform features)</li>
          </ul>

          <h2>Events and Registration</h2>
          <p>
            Registering for an event through the Service reserves your spot but doesn&apos;t
            guarantee attendance capacity; we may need to adjust event details or capacity and
            will do our best to communicate changes. Your registration and attendance history is
            visible to Health Decoded administrators for program coordination purposes.
          </p>

          <h2>Content You Provide</h2>
          <p>
            Any content you submit (profile information, avatar image, bio) should be appropriate
            and accurate. We may remove content or suspend accounts that violate these Terms or
            contain inappropriate material, particularly given the youth-focused nature of the
            Service.
          </p>

          <h2>Our Content</h2>
          <p>
            Materials on the Service, including the handbook, news posts, and educational
            resources, are provided for your use as an ambassador, volunteer, or visitor. You may
            not redistribute or republish them for commercial purposes without our permission.
          </p>

          <h2>Disclaimers</h2>
          <p>
            Health Decoded provides health literacy education and resources.{' '}
            <strong>Nothing on this Service is medical advice.</strong> We help people understand
            healthcare systems and documents; we don&apos;t diagnose, treat, or provide
            personalized medical guidance. Always consult a qualified healthcare provider for
            medical questions or decisions.
          </p>
          <p>
            The Service is provided &ldquo;as is.&rdquo; We do our best to keep it accurate and
            available, but we don&apos;t guarantee uninterrupted access or that all information is
            error-free.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the extent permitted by law, Health Decoded isn&apos;t liable for indirect,
            incidental, or consequential damages arising from your use of the Service. Nothing in
            these Terms limits liability where it can&apos;t legally be limited.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate access to the Service for anyone who violates these Terms.
            You can stop using the Service, or request account deletion, at any time (see our{' '}
            <a href="/privacy">Privacy Policy</a> for how).
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms as the Service evolves. We&apos;ll update the &ldquo;Last
            updated&rdquo; date when we do; continued use after changes means you accept the
            updated Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of New Jersey, without regard to
            conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
