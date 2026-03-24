export default function SocialConnect() {
  return (
    <section className="socialconnect" aria-label="Connect with us">
      <div className="socialconnect__inner">
        <div className="socialconnect__header">
          <h2 className="socialconnect__title">
            Connect <span>With Us</span>
          </h2>
          <p className="socialconnect__subtitle">
            Join our community and stay updated with the latest initiatives and health education resources.
          </p>
        </div>

        <div className="socialconnect__card" role="group" aria-label="Find our links">
          <a
            href="https://linktr.ee/healthdecodedinit"
            target="_blank"
            rel="noopener noreferrer"
            className="socialconnect__link"
            aria-label="Open our Linktree in a new tab"
          >
            <span className="socialconnect__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6 13.4a4 4 0 0 1 0-5.6l1.2-1.2a4 4 0 0 1 5.6 5.6l-1.2 1.2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.4 10.6a4 4 0 0 1 0 5.6l-1.2 1.2a4 4 0 0 1-5.6-5.6l1.2-1.2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="socialconnect__copy">
              <span className="socialconnect__label">Find all our links</span>
              <span className="socialconnect__url">linktr.ee/healthdecodedinit</span>
            </span>

            <span className="socialconnect__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
