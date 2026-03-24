'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Navbar({ onDonateClick }) {
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

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

  const isAboutPage = pathname?.startsWith('/about');
  const isHomePage = pathname === '/' || pathname === '';
  const isProgramsPage = pathname === '/programs';
  const isGetInvolvedPage = pathname === '/get-involved';
  const isContactPage = pathname === '/contact';

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
        <Link href="/" className="logo flex items-center gap-3" aria-label="Health Decoded Home">
          <img src="/logo192.png" alt="Health Decoded Logo" className="w-8 h-8 object-contain" />
          Health Decoded
        </Link>
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
          <Link href="/" className={isHomePage ? 'active' : ''} onClick={closeMobileMenu}>Home</Link>
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
              href="/about/us"
              className={isAboutPage ? 'active' : ''}
              onClick={closeMobileMenu}
              aria-haspopup="true"
              aria-expanded={aboutDropdown}
            >
              About
            </Link>
            <div className={`dropdown-menu ${aboutDropdown ? 'show' : ''}`}>
              <Link href="/about/us" onClick={closeMobileMenu}>About Us</Link>
              <Link href="/about/story" onClick={closeMobileMenu}>Our Story</Link>
              <Link href="/about/team" onClick={closeMobileMenu}>Our Team</Link>
            </div>
          </div>
          <Link href="/programs" className={isProgramsPage ? 'active' : ''} onClick={closeMobileMenu}>Programs</Link>
          <Link href="/get-involved" className={isGetInvolvedPage ? 'active' : ''} onClick={closeMobileMenu}>Get Involved</Link>
          <Link href="/contact" className={isContactPage ? 'active' : ''} onClick={closeMobileMenu}>Contact</Link>
          <Button
            className="donate-nav-button !rounded-full shadow-md"
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              onDonateClick();
            }}
          >
            Donate
          </Button>
        </div>
      </div>
    </nav>
  );
}
