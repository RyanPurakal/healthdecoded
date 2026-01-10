import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <Navbar />

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
          <Route path="/contact" element={<Contact />} />
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
            <p>contact@healthdecoded.org</p>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Health Decoded. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

function Navbar() {
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
          <Link to="/contact" className="donate-nav-button" onClick={closeMobileMenu}>
            <span>Donate</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home-page">
      <section className="hero" aria-label="Hero section">
        <div className="hero-background"></div>
        <div className="hero-image-overlay">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80" 
            alt="Diverse group of students and youth learning together" 
            className="hero-overlay-image"
            loading="eager"
            aria-hidden="true"
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
        <div className="social-icons">
          {/* Placeholder for social media links - add actual links when available */}
          <a href="#" className="social-icon" aria-label="Instagram - Opens in new tab" target="_blank" rel="noopener noreferrer">📷</a>
          <a href="#" className="social-icon" aria-label="Twitter - Opens in new tab" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="#" className="social-icon" aria-label="LinkedIn - Opens in new tab" target="_blank" rel="noopener noreferrer">💼</a>
          <a href="#" className="social-icon" aria-label="Facebook - Opens in new tab" target="_blank" rel="noopener noreferrer">👥</a>
        </div>
      </section>
    </div>
  );
}

function About() {
  return <AboutUs />;
}

function AboutUs() {
  return (
    <div className="about-page">
      <nav className="subnav" role="navigation" aria-label="About section navigation">
        <Link to="/about/us" className="subnav-link active">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link">Our Team</Link>
      </nav>

      <section className="section" aria-labelledby="about-heading">
        <h2 id="about-heading">About Us</h2>
        <p className="section-subtitle">Empowering youth with accessible health education</p>
        <div className="story-content">
          <div className="mission-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
              alt="Young adults collaborating together around a table, working on health education projects" 
              className="mission-image"
              loading="lazy"
            />
          </div>
          <section className="mission-section-inline">
            <h3>Our Mission</h3>
            <p className="mission-text-inline">Health Decoded's mission is to bridge the health literacy gap for youth by transforming complex healthcare information into clear, accessible, and culturally responsive education. We aim to ensure that every young person—regardless of background, language, or socioeconomic status—has the knowledge to understand their health, navigate medical systems, and make informed decisions. Healthcare touches everyone, and so should health education.</p>
          </section>
        </div>
      </section>
    </div>
  );
}

function OurStory() {
  return (
    <div className="about-page">
      <nav className="subnav" role="navigation" aria-label="About section navigation">
        <Link to="/about/us" className="subnav-link">About Us</Link>
        <Link to="/about/story" className="subnav-link active">Our Story</Link>
        <Link to="/about/team" className="subnav-link">Our Team</Link>
      </nav>

      <section className="section" aria-labelledby="story-heading">
        <h2 id="story-heading">Our Story</h2>
        <p className="section-subtitle">How Health Decoded began</p>
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
  return (
    <div className="about-page">
      <nav className="subnav" role="navigation" aria-label="About section navigation">
        <Link to="/about/us" className="subnav-link">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link active">Our Team</Link>
      </nav>

      <section className="section" aria-labelledby="team-heading">
        <h2 id="team-heading">Our Team</h2>
        <p className="section-subtitle">The dedicated students behind Health Decoded</p>
        <p className="section-text">Coming soon - professional photos and detailed profiles</p>
        <div className="team-names" role="list" aria-label="Team members">
          <span className="name-tag" role="listitem">Ruv</span>
          <span className="name-tag" role="listitem">Kartik</span>
          <span className="name-tag" role="listitem">Celdave</span>
          <span className="name-tag" role="listitem">Gil</span>
          <span className="name-tag" role="listitem">Ryan</span>
        </div>
      </section>

      <section className="section team-detailed-section" aria-labelledby="team-details-heading">
        <h2 id="team-details-heading" className="sr-only">Team Member Details</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">R</div>
            <h3>Ruv</h3>
            <p className="member-bio">Coming soon</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">K</div>
            <h3>Kartik</h3>
            <p className="member-bio">Kartik is a freshman at Rutgers University-New Brunswick majoring in Cell Biology and Neuroscience. He aspires to make a change in the healthcare community by bringing the truth forward and exposing the complexities in the system. In his free time he enjoys riding as an EMT and making a difference in the lives of others.</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">C</div>
            <h3>Celdave</h3>
            <p className="member-bio">Celdave is a freshman at Rutgers University-New Brunswick majoring in Biological Sciences. She is thrilled to be a part of Health Decoded and wants to help educate others on health literacy. In her free time she loves to play piano and bake (her favorite desert to make is double chocolate chip brownies).</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">G</div>
            <h3>Gil</h3>
            <p className="member-bio">Gil is a freshman at Rutgers University-New Brunswick, majoring in Biochemistry. He is interested in medicine, wanting to create better knowledge about health care through education. In his free time he loves to go rock climbing and likes to spend time outside.</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">R</div>
            <h3>Ryan</h3>
            <p className="member-bio">Ryan is a freshman majoring in Computer Science at Rutgers. He's really excited to help with the global push for health education through tech initiatives. In his free time he loves to watch movies and shows (his favorites are Se7en and Better Call Saul).</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Programs() {
  return (
    <div className="programs-page">
      <section className="section" aria-labelledby="programs-heading">
        <h2 id="programs-heading">Our Programs</h2>
        <p className="section-subtitle">Empowering youth through comprehensive health education</p>
        
        <div className="programs-grid">
          <article className="program-card">
            <div className="program-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" 
              alt="Students participating in a health education workshop" 
              className="program-image"
              loading="lazy"
            />
            </div>
            <h3>🏥 Health Decoded School Workshops</h3>
            <p className="program-subtitle">Flagship Initiative</p>
            <p>In-school or after-school workshops teaching:</p>
            <ul className="program-list">
              <li>How to navigate a doctor's visit</li>
              <li>Understanding prescriptions, labs, and insurance</li>
              <li>Communicating symptoms effectively</li>
              <li>Basic anatomy & first aid essentials</li>
              <li>Recognizing emergencies vs. non-emergencies</li>
            </ul>
            <p className="program-target"><strong>Target:</strong> Middle schools and high school students, maybe also elementary</p>
          </article>

          <article className="program-card">
            <div className="program-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80" 
              alt="Peer mentors and students working together on health education" 
              className="program-image"
              loading="lazy"
            />
            </div>
            <h3>🤝 Peer Health Ambassador Program</h3>
            <p>Ambassadors learn:</p>
            <ul className="program-list">
              <li>Communication skills</li>
              <li>Health misinformation detection</li>
              <li>Advocacy</li>
              <li>Peer education workshops</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

function GetInvolved() {
  const handleCardClick = (action) => {
    // Navigate to contact page with a specific message or scroll to form
    window.location.href = '/contact';
  };

  return (
    <div className="get-involved-page">
      <section className="section" aria-labelledby="get-involved-heading">
        <h2 id="get-involved-heading">Get Involved</h2>
        <p className="section-subtitle">Join us in making health education accessible to all youth</p>
        <div className="involvement-grid">
          <article className="involvement-card" onClick={() => handleCardClick('volunteer')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick('volunteer'); }}>
            <div className="involvement-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80" 
              alt="Volunteers working together on community health projects" 
              className="involvement-image"
              loading="lazy"
            />
            </div>
            <h3>Volunteer</h3>
            <p>Join us in making health education accessible to all youth.</p>
            <span className="involvement-card-button">Learn More</span>
          </article>
          <article className="involvement-card" onClick={() => handleCardClick('ambassador')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick('ambassador'); }}>
            <div className="involvement-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80" 
              alt="Student ambassador leading a health education workshop" 
              className="involvement-image"
              loading="lazy"
            />
            </div>
            <h3>Become an Ambassador</h3>
            <p>Lead peer education workshops and advocate for health literacy.</p>
            <span className="involvement-card-button">Learn More</span>
          </article>
          <article className="involvement-card" onClick={() => handleCardClick('chapter')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick('chapter'); }}>
            <div className="involvement-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80" 
              alt="Students collaborating to start a new chapter" 
              className="involvement-image"
              loading="lazy"
            />
            </div>
            <h3>Create a New Chapter</h3>
            <p>Start Health Decoded in your community or school.</p>
            <span className="involvement-card-button">Learn More</span>
          </article>
          <article className="involvement-card" onClick={() => handleCardClick('partner')} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick('partner'); }}>
            <div className="involvement-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80" 
              alt="Partnership between schools and organizations for health education" 
              className="involvement-image"
              loading="lazy"
            />
            </div>
            <h3>Partner With Us</h3>
            <p>Schools, organizations, and institutions - let's work together.</p>
            <span className="involvement-card-button">Learn More</span>
          </article>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-page">
      <section className="section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact Us</h2>
        <p className="section-subtitle">Have questions or want to get involved? Reach out to us!</p>
        <div className="contact-content">
          <p>We'd love to hear from you. Send us an email and we'll get back to you as soon as possible.</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:contact@healthdecoded.org" className="email-link" aria-label="Email us at contact@healthdecoded.org">contact@healthdecoded.org</a></p>
          </div>
        </div>
      </section>

      <section className="section donate-section" aria-labelledby="donate-heading">
        <h2 id="donate-heading">Support Our Mission</h2>
        <p className="section-subtitle">Help us bring health education to youth across communities</p>
        <div className="donate-content">
          <p>Your support helps us bring health education to youth across communities. Donations enable us to:</p>
          <ul className="donate-list" role="list">
            <li role="listitem">Develop and deliver school workshops</li>
            <li role="listitem">Train peer health ambassadors</li>
            <li role="listitem">Create educational resources</li>
            <li role="listitem">Expand our reach to underserved communities</li>
          </ul>
          <div className="donate-button-container">
            <button className="donate-button" aria-label="Donate to Health Decoded">Donate Now</button>
            <p className="donate-note">Donations page coming soon</p>
          </div>
        </div>
      </section>
    </div>
  );
}
