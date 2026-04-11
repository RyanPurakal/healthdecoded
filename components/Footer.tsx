import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Health Decoded</h4>
          <p>
            Building an international community of youth using health education to change the world.
          </p>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>
              <Link href="/about/us/">About Us</Link>
            </li>
            <li>
              <Link href="/about/story/">Our Story</Link>
            </li>
            <li>
              <Link href="/about/team/">Our Team</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Programs</h4>
          <ul>
            <li>
              <Link href="/programs/">Our Programs</Link>
            </li>
            <li>
              <Link href="/get-involved/">Get Involved</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="mailto:kartikn@healthdecodedinitiative.org">kartikn@healthdecodedinitiative.org</a>
            </li>
            <li>
              <a href="https://linktr.ee/healthdecodedinit" target="_blank" rel="noopener noreferrer">
                Linktree
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {year} Health Decoded Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
