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
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAboutPage = location.pathname.startsWith('/about');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Health Decoded</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <div 
            className="nav-dropdown" 
            ref={dropdownRef}
            onMouseEnter={() => setAboutDropdown(true)}
            onMouseLeave={() => setAboutDropdown(false)}
          >
            <Link 
              to="/about" 
              className={isAboutPage ? 'active' : ''}
            >
              About
            </Link>
            {aboutDropdown && (
              <div className="dropdown-menu">
                <Link to="/about/us" onClick={() => setAboutDropdown(false)}>About Us</Link>
                <Link to="/about/story" onClick={() => setAboutDropdown(false)}>Our Story</Link>
                <Link to="/about/team" onClick={() => setAboutDropdown(false)}>Our Team</Link>
              </div>
            )}
          </div>
          <Link to="/programs">Programs</Link>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact" className="donate-nav-button">Donate</Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>A world of difference begins here.</h1>
        <p className="hero-subtitle">Bridging the health literacy gap for youth through clear, accessible, and culturally responsive education.</p>
        <button className="cta-button">Learn More</button>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>Health literacy</h3>
            <p>is essential for every young person, yet rarely taught in schools</p>
          </div>
          <div className="stat-item">
            <h3>Clear information</h3>
            <p>transforms complex healthcare into something approachable and human</p>
          </div>
          <div className="stat-item">
            <h3>Empowered youth</h3>
            <p>can navigate medical systems and make informed health decisions</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
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

      <section className="social-section">
        <h2>Connect With Us</h2>
        <p className="social-description">Follow us on social media to stay updated with our latest initiatives and health education resources.</p>
        <div className="social-icons">
          {/* Placeholder for social media links - add actual links when available */}
          <a href="#" className="social-icon" aria-label="Instagram">📷</a>
          <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
          <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
          <a href="#" className="social-icon" aria-label="Facebook">👥</a>
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
      <div className="subnav">
        <Link to="/about/us" className="subnav-link active">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link">Our Team</Link>
      </div>

      <section className="section">
        <h2>About Us</h2>
        <div className="story-content">
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
  return (
    <div className="about-page">
      <div className="subnav">
        <Link to="/about/us" className="subnav-link">About Us</Link>
        <Link to="/about/story" className="subnav-link">Our Story</Link>
        <Link to="/about/team" className="subnav-link active">Our Team</Link>
      </div>

      <section className="section">
        <h2>Our Team</h2>
        <p className="section-text">Coming soon - professional photos and detailed profiles</p>
        <div className="team-names">
          <span className="name-tag">Ruv</span>
          <span className="name-tag">Kartik</span>
          <span className="name-tag">Celdave</span>
          <span className="name-tag">Gil</span>
          <span className="name-tag">Ryan</span>
        </div>
      </section>

      <section className="section team-detailed-section">
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
      <section className="section">
        <h2>Our Programs</h2>
        
        <div className="program-card">
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
        </div>

        <div className="program-card">
          <h3>🤝 Peer Health Ambassador Program</h3>
          <p>Ambassadors learn:</p>
          <ul className="program-list">
            <li>Communication skills</li>
            <li>Health misinformation detection</li>
            <li>Advocacy</li>
            <li>Peer education workshops</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function GetInvolved() {
  return (
    <div className="get-involved-page">
      <section className="section">
        <h2>Get Involved</h2>
        <div className="involvement-grid">
          <div className="involvement-card">
            <h3>Volunteer</h3>
            <p>Join us in making health education accessible to all youth.</p>
          </div>
          <div className="involvement-card">
            <h3>Become an Ambassador</h3>
            <p>Lead peer education workshops and advocate for health literacy.</p>
          </div>
          <div className="involvement-card">
            <h3>Create a New Chapter</h3>
            <p>Start Health Decoded in your community or school.</p>
          </div>
          <div className="involvement-card">
            <h3>Partner With Us</h3>
            <p>Schools, organizations, and institutions - let's work together.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-page">
      <section className="section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <p>Have questions or want to get involved? Reach out to us!</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:contact@healthdecoded.org" className="email-link">contact@healthdecoded.org</a></p>
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
            <button className="donate-button">Donate Now</button>
            <p className="donate-note">Donations page coming soon</p>
          </div>
        </div>
      </section>
    </div>
  );
}
