import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import { pageview } from "./utils/analytics";

// Component to track page views
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
}

export default function App() {
  const [showDonateModal, setShowDonateModal] = useState(false);

  useEffect(() => {
    if (showDonateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showDonateModal]);

  // Initialize analytics on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      pageview(window.location.pathname);
    }
  }, []);

  const openDonateModal = () => {
    setShowDonateModal(true);
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
  };

  return (
    <BrowserRouter>
      <PageTracker />
      {/* Navigation */}
      <Navbar onDonateClick={openDonateModal} />

      {/* Page Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/us" element={<AboutUs />} />
          <Route path="/about/story" element={<OurStory />} />
          <Route path="/about/team" element={<OurTeam />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact onDonateClick={openDonateModal} />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/get-involved">Get Involved</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>kartikn@healthdecodedinitiative.org</p>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Health Decoded. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Donate Modal */}
      {showDonateModal && (
        <DonateModal onClose={closeDonateModal} />
      )}
    </BrowserRouter>
  );
}

function Navbar({ onDonateClick }) {
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdown(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isAboutPage = location.pathname.startsWith('/about');
  const isHomePage = location.pathname === '/';
  const isProgramsPage = location.pathname === '/programs';
  const isGetInvolvedPage = location.pathname === '/get-involved';
  const isContactPage = location.pathname === '/contact';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setAboutDropdown(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="logo" aria-label="Health Decoded Home">Health Decoded</Link>
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isHomePage ? 'active' : ''} onClick={closeMobileMenu}>Home</Link>
          <div
            className="nav-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setAboutDropdown(true)}
            onMouseLeave={() => setAboutDropdown(false)}
            onFocus={() => setAboutDropdown(true)}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget)) {
                setAboutDropdown(false);
              }
            }}
          >
            <Link
              to="/about"
              className={isAboutPage ? 'active' : ''}
              onClick={closeMobileMenu}
              aria-haspopup="true"
              aria-expanded={aboutDropdown}
            >
              About
            </Link>
            <div className={`dropdown-menu ${aboutDropdown ? 'show' : ''}`}>
              <Link to="/about/us" onClick={closeMobileMenu}>About Us</Link>
              <Link to="/about/story" onClick={closeMobileMenu}>Our Story</Link>
              <Link to="/about/team" onClick={closeMobileMenu}>Our Team</Link>
            </div>
          </div>
          <Link to="/programs" className={isProgramsPage ? 'active' : ''} onClick={closeMobileMenu}>Programs</Link>
          <Link to="/get-involved" className={isGetInvolvedPage ? 'active' : ''} onClick={closeMobileMenu}>Get Involved</Link>
          <Link to="/contact" className={isContactPage ? 'active' : ''} onClick={closeMobileMenu}>Contact</Link>
          <button
            className="donate-nav-button"
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              onDonateClick();
            }}
          >
            <span>Donate</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  useEffect(() => {
    document.title = "Health Decoded - Empowering Youth Through Health Education";
  }, []);

  return (
    <div className="home-page">
      <section className="hero" aria-label="Hero section">
        <div className="hero-background"></div>
        <div className="hero-image-overlay">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80"
            alt="Diverse group of students and youth learning together"
            className="hero-overlay-image"
            loading="eager"
            aria-hidden="true"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80";
            }}
          />
        </div>
        <div className="container hero-content">
          <div className="hero-text-wrapper">
            <h1>Health Decoded</h1>
            <p className="hero-subtitle">Building an international community of youth using health education to change the world</p>
            <div className="hero-cta-group">
              <Link to="/programs" className="cta-button primary">Learn More</Link>
              <Link to="/get-involved" className="cta-button secondary">Get Involved</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-label="Our values">
        <div className="container">
          <h2 className="stats-section-heading">Why Health Education Matters</h2>
          <p className="stats-section-subtitle">Every young person deserves the knowledge to make informed health decisions</p>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-item-icon" aria-hidden="true">📚</div>
            <h3>Health literacy</h3>
            <p>is essential for every young person, yet rarely taught in schools</p>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon" aria-hidden="true">💡</div>
            <h3>Clear information</h3>
            <p>transforms complex healthcare into something approachable and human</p>
          </div>
          <div className="stat-item">
            <div className="stat-item-icon" aria-hidden="true">✨</div>
            <h3>Empowered youth</h3>
            <p>can navigate medical systems and make informed health decisions</p>
          </div>
        </div>
      </section>

      <section className="featured-programs-section" aria-label="Featured programs">
        <div className="container">
          <h2>Our Programs</h2>
          <p className="section-subtitle">Comprehensive health education designed for youth</p>
          <div className="featured-programs-grid">
            <article className="featured-program-card">
              <div className="featured-program-icon">🏥</div>
              <h3>School Workshops</h3>
              <p>In-school and after-school workshops teaching essential health literacy skills, from navigating doctor visits to understanding prescriptions and insurance.</p>
              <Link to="/programs" className="featured-program-link">Learn More →</Link>
            </article>
            <article className="featured-program-card">
              <div className="featured-program-icon">🤝</div>
              <h3>Peer Ambassador Program</h3>
              <p>Train to become a peer health ambassador and lead workshops while developing communication skills and advocacy expertise.</p>
              <Link to="/programs" className="featured-program-link">Learn More →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Call to action">
        <div className="cta-section-image-container">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
            alt="Students collaborating on health education"
            className="cta-section-image"
            loading="lazy"
          />
          <div className="cta-section-overlay"></div>
        </div>
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Join us in empowering youth through health education. Whether you want to volunteer, become an ambassador, or start a chapter, we'd love to have you.</p>
          <div className="cta-section-buttons">
            <Link to="/get-involved" className="cta-button">Get Involved</Link>
            <Link to="/contact" className="cta-button secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="social-section" aria-label="Connect with us">
        <h2>Connect With Us</h2>
        <p className="social-description">Follow us on social media to stay updated with our latest initiatives and health education resources.</p>
        <div className="linktree-container">
          <a
            href="https://linktr.ee/healthdecodedinit"
            className="linktree-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Linktree - Opens in new tab"
          >
            <div className="linktree-icon">🔗</div>
            <div className="linktree-content">
              <span className="linktree-label">Find all our links</span>
              <span className="linktree-url">linktr.ee/healthdecodedinit</span>
            </div>
            <div className="linktree-arrow">→</div>
          </a>
        </div>
      </section>
    </div>
  );
}

function About() {
  return <AboutUs />;
}

function AboutUs() {
  useEffect(() => {
    document.title = "About Us - Health Decoded";
  }, []);

  return (
    <div className="about-page">
      <div className="subnav">
        <Link to="/about/us" className="subnav-link active">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link">Our Team</Link>
      </div>

      <section className="section">
        <h2>About Us</h2>
        <div className="story-content">
          <section className="mission-section-inline">
            <div className="mission-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80"
                alt="Team members collaborating on health education initiatives"
                className="mission-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";
                }}
              />
            </div>
            <h3>Our Mission</h3>
            <p className="mission-text-inline">Health Decoded's mission is to bridge the health literacy gap for youth by transforming complex healthcare information into clear, accessible, and culturally responsive education. We aim to ensure that every young person—regardless of background, language, or socioeconomic status—has the knowledge to understand their health, navigate medical systems, and make informed decisions. Healthcare touches everyone, and so should health education.</p>
          </section>
        </div>
      </section>
    </div>
  );
}

function OurStory() {
  useEffect(() => {
    document.title = "Our Story - Health Decoded";
  }, []);

  return (
    <div className="about-page">
      <div className="subnav">
        <Link to="/about/us" className="subnav-link">About Us</Link>
        <Link to="/about/story" className="subnav-link active">Our Story</Link>
        <Link to="/about/team" className="subnav-link">Our Team</Link>
      </div>

      <section className="section">
        <h2>Our Story</h2>
        <div className="story-content">
          <p>Health Decoded began with an observation that Ruvanthika made early within her own family. Many of her relatives lived in rural India—small villages where clear, reliable health information wasn't easy to access. People often relied on word-of-mouth, guesswork, or whatever limited resources were available, and even simple medical decisions became overwhelming.</p>

          <p>As Ruvanthika grew older and began working in EMS, she noticed similar patterns emerging in her own community. Even in an environment with more hospitals and advanced technology, health information was not distributed equally. A person's ability to understand their care often depended on socioeconomic status, language, or whether anyone had ever taken the time to explain the basics to them.</p>

          <p>She also realized something unexpected: she had never received any formal education about how the healthcare system worked either. Despite attending strong schools and learning subjects such as financial literacy, health literacy—something every person needs throughout their life—was never part of the curriculum. This led her to question why healthcare understanding isn't woven into education at every age level. Healthcare is universal; everyone will interact with it, yet young people are rarely taught how to navigate it.</p>

          <p>This realization ultimately led Ruvanthika to create Health Decoded. Her goal was to build an organization that empowers young people—especially those from under-resourced or multilingual communities—to understand healthcare in a way that feels simple, supportive, and culturally aware. HealthDecoded aims to provide a space where medical information is broken down into something approachable and human, regardless of a student's background or prior knowledge.</p>
        </div>
      </section>
    </div>
  );
}

function OurTeam() {
  useEffect(() => {
    document.title = "Our Team - Health Decoded";
  }, []);

  return (
    <div className="about-page">
      <div className="subnav">
        <Link to="/about/us" className="subnav-link">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link active">Our Team</Link>
      </div>

      <section className="section">
        <h2>Our Team</h2>
        <div className="team-names">
          <span className="name-tag">Ruvanthika</span>
          <span className="name-tag">Celdave</span>
          <span className="name-tag">Ryan</span>
          <span className="name-tag">Gil</span>
          <span className="name-tag">Kartik</span>
        </div>
      </section>

      <section className="section team-detailed-section">
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <img
                src="/team/ruvanthika.jpg"
                alt="Ruvanthika Sivaprakasini Veerasikku"
                className="member-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'R';
                }}
              />
            </div>
            <h3>Ruvanthika Sivaprakasini Veerasikku</h3>
            <p className="member-title">Executive Director</p>
            <p className="member-bio">Ruvanthika is a freshman at Rutgers University–New Brunswick majoring in Cell Biology and Neuroscience. She is excited to be a part of Health Decoded and is passionate about improving health literacy and access to clear, reliable medical information. In her free time, she enjoys reading, snowboarding, and watching movies.</p>
            <div className="member-email">
              <a href="mailto:ruvanthikasv@healthdecodedinitiative.org" className="member-email-button">Email</a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <img
                src="/team/celdave.jpg"
                alt="Celdave Weaver"
                className="member-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'C';
                }}
              />
            </div>
            <h3>Celdave Weaver</h3>
            <p className="member-title">Director of Education & Outreach</p>
            <p className="member-bio">Celdave is a freshman at Rutgers University-New Brunswick majoring in Biological Sciences. She is thrilled to be a part of Health Decoded and wants to help educate others on health literacy. In her free time she loves to play piano and bake (her favorite desert to make is double chocolate chip brownies).</p>
            <div className="member-email">
              <a href="mailto:celdavew@healthdecodedinitiative.org" className="member-email-button">Email</a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <img
                src="/team/ryan.jpg"
                alt="Ryan Purakal"
                className="member-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'R';
                }}
              />
            </div>
            <h3>Ryan Purakal</h3>
            <p className="member-title">Director of Technology</p>
            <p className="member-bio">Ryan is a freshman majoring in Computer Science at Rutgers. He's really excited to help with the global push for health education through tech initiatives. In his free time he loves to watch movies and shows (his favorites are Se7en and Better Call Saul).</p>
            <div className="member-email">
              <a href="mailto:ryanp@healthdecodedinitiative.org" className="member-email-button">Email</a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <img
                src="/team/gil.jpg"
                alt="Gil Shenoy"
                className="member-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'G';
                }}
              />
            </div>
            <h3>Gil Shenoy</h3>
            <p className="member-title">Director of Operations</p>
            <p className="member-bio">Gil is a freshman at Rutgers University-New Brunswick, majoring in Biochemistry. He is interested in medicine, wanting to create better knowledge about health care through education. In his free time he loves to go rock climbing and likes to spend time outside.</p>
            <div className="member-email">
              <a href="mailto:gils@healthdecodedinitiative.org" className="member-email-button">Email</a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <img
                src="/team/kartik.jpg"
                alt="Kartik Narula"
                className="member-photo"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.textContent = 'K';
                }}
              />
            </div>
            <h3>Kartik Narula</h3>
            <p className="member-title">Director of Communications</p>
            <p className="member-bio">Kartik is a freshman at Rutgers University-New Brunswick majoring in Cell Biology and Neuroscience. He aspires to make a change in the healthcare community by bringing the truth forward and exposing the complexities in the system. In his free time he enjoys riding as an EMT and making a difference in the lives of others.</p>
            <div className="member-email">
              <a href="mailto:kartikn@healthdecodedinitiative.org" className="member-email-button">Email</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Programs() {
  useEffect(() => {
    document.title = "Our Programs - Health Decoded";
  }, []);

  return (
    <div className="programs-page">
      <section className="section">
        <h2>Our Programs</h2>
        <p className="section-subtitle">Comprehensive health education designed for youth</p>

        <div className="programs-grid">
          <div className="program-card">
            <div className="program-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
                alt="Students learning in a classroom workshop"
                className="program-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";
                }}
              />
            </div>
            <h3>Health Decoded School Workshops</h3>
            <p className="program-subtitle">Flagship Initiative</p>
            <p>In-school or after-school workshops teaching:</p>
            <ul className="program-list">
              <li>How to navigate a doctor's visit</li>
              <li>Understanding prescriptions, labs, and insurance</li>
              <li>Communicating symptoms effectively</li>
              <li>Basic anatomy & first aid essentials</li>
              <li>Recognizing emergencies vs. non-emergencies</li>
            </ul>
            <p className="program-target"><strong>Target:</strong> K-12 students</p>
          </div>

          <div className="program-card">
            <div className="program-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Youth leaders and peer ambassadors working together"
                className="program-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
                }}
              />
            </div>
            <h3>Peer Health Ambassador Program</h3>
            <p>Ambassadors learn:</p>
            <ul className="program-list">
              <li>Communication skills</li>
              <li>Health misinformation detection</li>
              <li>Advocacy</li>
              <li>Peer education workshops</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function GetInvolved() {
  useEffect(() => {
    document.title = "Get Involved - Health Decoded";
  }, []);

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
            <a
              href="https://forms.gle/oM3SsuVrcVV6xy8ZA"
              className="involvement-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
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
            <a
              href="https://forms.gle/j8TqzZV3BYvd4kBb9"
              className="involvement-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
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
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe73_Eb1v4pqS0ps0mgwa3_s7vbcRY3ZdqqmQpmk5-90VvdCA/viewform?usp=publish-editor"
              className="involvement-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
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
            <p>Schools, organizations, and institutions - let's work together.</p>
            <a
              href="https://forms.gle/Q9u3LFereNudSuF48"
              className="involvement-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Contact({ onDonateClick }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    document.title = "Contact Us - Health Decoded";
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    onDonateClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using Formspree - replace YOUR_FORM_ID with your actual Formspree form ID
      // Alternative: Use EmailJS, your own backend API, or other service
      const response = await fetch('https://formspree.io/f/xlgnvoej', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Contact Form Submission',
            value: 1
          });
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <p>Have questions or want to get involved? Reach out to us!</p>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? 'error' : ''}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                />
                {formErrors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? 'error' : ''}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {formErrors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                  aria-invalid={!!formErrors.subject}
                  aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                />
                {formErrors.subject && (
                  <span id="subject-error" className="error-message" role="alert">
                    {formErrors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={formErrors.message ? 'error' : ''}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                />
                {formErrors.message && (
                  <span id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="form-success" role="alert">
                  <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-error" role="alert">
                  <p>Sorry, there was an error sending your message. Please try again or email us directly at <a href="mailto:kartikn@healthdecodedinitiative.org">kartikn@healthdecodedinitiative.org</a>.</p>
                </div>
              )}

              <button
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <p><strong>Or email us directly:</strong> <a href="mailto:kartikn@healthdecodedinitiative.org" className="email-link">kartikn@healthdecodedinitiative.org</a></p>
          </div>
        </div>
      </section>

      <section className="section donate-section">
        <h2>Support Our Mission</h2>
        <div className="donate-content">
          <p>Your support helps us bring health education to youth across communities. Donations enable us to:</p>
          <ul className="donate-list">
            <li>Develop and deliver school workshops</li>
            <li>Train peer health ambassadors</li>
            <li>Create educational resources</li>
            <li>Expand our reach to underserved communities</li>
          </ul>
          <div className="donate-button-container">
            <button className="donate-button" onClick={handleDonateClick}>Donate Now</button>
            <p className="donate-note">Donations page coming soon</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DonateModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} aria-label="Close modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <div className="modal-body">
          <h3>Coming Soon</h3>
          <p>Our donation page is currently under development. Check back soon to support our mission!</p>
          <button className="modal-button" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
