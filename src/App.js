import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { pageview } from "./utils/analytics";
import TeamSectionBlock from "./components/ui/team-section-block-shadcnui";
import AboutUsSection from "./components/ui/about-us-section";
import { FeatureSteps } from "./components/ui/feature-section";
import ShimmerButton from "./components/ui/shimmer-button";
import InteractiveHoverButton from "./components/ui/interactive-hover-button";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import ProgramsFeatureSections from "./components/ui/feature-sections.jsx";
import SocialConnect from "./components/ui/connect-with-us.jsx";

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
          <ShimmerButton
            className="donate-nav-button"
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              onDonateClick();
            }}
          >
            <span>Donate</span>
          </ShimmerButton>
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
        <div className="hero-background" />
        <div className="hero-image-overlay">
          <img
            src="/images/events/community-tables.png"
            alt="Youth participating at a Health Decoded event"
            className="hero-overlay-image"
            loading="eager"
            aria-hidden="true"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80";
            }}
          />
        </div>
        <div className="container hero-content">
          <div className="hero-text-wrapper">
            <h1>Health education, decoded for youth.</h1>
            <p className="hero-subtitle">
            Building an international community of youth using health education to change the world
            </p>
            <div className="hero-cta-group">
              <InteractiveHoverButton
                to="/programs"
                text="Explore our programs"
                classes="interactive-hover-button--hero"
              />
              <InteractiveHoverButton
                to="/get-involved"
                text="Get involved"
                classes="interactive-hover-button--hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky-scroll-section" aria-label="Our values">
        <div className="container sticky-scroll-section__header">
          <h2 className="stats-section-heading">Why Health Education Matters</h2>
          <p className="stats-section-subtitle">Every young person deserves the knowledge to make informed health decisions</p>
        </div>
        <StickyScroll
          contentClassName="sticky-scroll-section__panel"
          content={[
            {
              title: "Health literacy",
              description: "is essential for every young person, yet rarely taught in schools",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/workshop-opqrst.png"
                    alt="Students learning health literacy in a workshop"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">01</p>
                      <h3>Health literacy</h3>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Clear information",
              description: "transforms complex healthcare into something approachable and human",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/workshop-woman-leading.png"
                    alt="Health Decoded team teaching clear communication"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">02</p>
                      <h3>Clear information</h3>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Empowered youth",
              description: "can navigate medical systems and make informed health decisions",
              content: (
                <div className="sticky-scroll-media">
                  <img
                    src="/images/events/community-engaged.png"
                    alt="Youth engaged at a Health Decoded event"
                    className="sticky-scroll-media__image"
                  />
                  <div className="sticky-scroll-media__overlay">
                    <div>
                      <p className="sticky-scroll-media__eyebrow">03</p>
                      <h3>Empowered youth</h3>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>

      <SocialConnect />
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

      <section className="section section-no-padding">
        <AboutUsSection />
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

      <section className="section section-no-padding">
        <FeatureSteps
          title="Our Story"
          imageHeight="feature-steps-story-image"
          features={[
            {
              step: "Step 1",
              title: "It started with a real gap",
              content:
                "Health Decoded began with an observation that Ruvanthika made early within her own family. Many of her relatives lived in rural India—small villages where clear, reliable health information wasn't easy to access. People often relied on word-of-mouth, guesswork, or whatever limited resources were available, and even simple medical decisions became overwhelming.",
              image:
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 2",
              title: "The problem showed up everywhere",
              content:
                "As Ruvanthika grew older and began working in EMS, she noticed similar patterns emerging in her own community. Even in an environment with more hospitals and advanced technology, health information was not distributed equally. A person's ability to understand their care often depended on socioeconomic status, language, or whether anyone had ever taken the time to explain the basics to them.",
              image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 3",
              title: "The curriculum gap became obvious",
              content:
                "She also realized something unexpected: she had never received any formal education about how the healthcare system worked either. Despite attending strong schools and learning subjects such as financial literacy, health literacy—something every person needs throughout their life—was never part of the curriculum. This led her to question why healthcare understanding isn't woven into education at every age level. Healthcare is universal; everyone will interact with it, yet young people are rarely taught how to navigate it.",
              image:
                "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 4",
              title: "Health Decoded was created",
              content:
                "This realization ultimately led Ruvanthika to create Health Decoded. Her goal was to build an organization that empowers young people—especially those from under-resourced or multilingual communities—to understand healthcare in a way that feels simple, supportive, and culturally aware. HealthDecoded aims to provide a space where medical information is broken down into something approachable and human, regardless of a student's background or prior knowledge.",
              image:
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop",
            },
          ]}
        />
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

      <section className="section section-no-padding">
        <TeamSectionBlock />
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
      <ProgramsFeatureSections />
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
            <p>Schools, organizations, and institutions - let's work together.</p>
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
      <section className="section contact-section-modern" aria-label="Contact us">
        <div className="contact-section-modern-bg" aria-hidden="true" />
        <div className="contact-section-modern-inner">
          <div className="contact-section-modern-left">
            <h2 className="contact-section-title">
              We&apos;d love to hear how you want to bring health education to your community.
            </h2>
            <p className="contact-section-subtitle">
              Share a bit about yourself or your school, and we&apos;ll follow up with next steps, resources, or ways to get involved.
            </p>
            <div className="contact-section-email">
              <span>Fill out the form or mail us at</span>
              <a href="mailto:kartikn@healthdecodedinitiative.org">kartikn@healthdecodedinitiative.org</a>
            </div>
          </div>

          <div className="contact-section-modern-card">
            <h3 className="contact-section-card-title">Send us a message</h3>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-grid">
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

              <ShimmerButton
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </ShimmerButton>
            </form>
          </div>
        </div>
      </section>

      <section
        className="section donate-section"
        aria-label="Support our mission"
      >
        <div className="donate-content">
          <motion.div
            className="donate-growth-images"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            aria-label="Illustration of how your support helps Health Decoded grow"
          >
            {[
              "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&q=80",
              "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80",
              "https://images.unsplash.com/photo-1514996937319-344454492b37?w=600&q=80",
            ].map((src, index) => (
              <motion.div
                key={index}
                className="donate-growth-image-wrapper"
                variants={{
                  hidden: { y: 24, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
              >
                <img
                  src={src}
                  alt={`Health education impact scene ${index + 1}`}
                  className="donate-growth-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1514996937319-344454492b37?w=600&q=80";
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            className="donate-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Support Our Mission
          </motion.h2>

          <motion.div
            className="donate-growth-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p>
              Your support helps us bring health education to youth across
              communities. Donations enable us to:
            </p>
            <ul className="donate-list">
              <li>Develop and deliver school workshops</li>
              <li>Train peer health ambassadors</li>
              <li>Create educational resources</li>
              <li>Expand our reach to underserved communities</li>
            </ul>
          </motion.div>

          <motion.div
            className="donate-button-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ShimmerButton
              className="donate-button"
              onClick={handleDonateClick}
            >
              Get notified when donating opens
            </ShimmerButton>
            <p className="donate-note">
              Our donations page is coming soon. In the meantime, you can still
              reach out to partner or collaborate with us.
            </p>
          </motion.div>
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
          <ShimmerButton className="modal-button" onClick={onClose}>Got it</ShimmerButton>
        </div>
      </div>
    </div>
  );
}
