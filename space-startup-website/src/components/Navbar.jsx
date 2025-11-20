// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    // Unlock body scroll when menu closes
    document.body.style.overflow = 'auto';
  }, [location]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header 
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.container}>
          
          {/* Logo */}
          <Link 
            to="/" 
            className={styles.logo}
            aria-label="SPACE - Homepage"
          >
            <span className={styles.logoText}>SPACE</span>
            <span className={styles.logoDot}>.</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav 
            className={styles.navLinks}
            role="navigation"
            aria-label="Main navigation"
          >
            <Link 
              to="/" 
              className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Home</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/services" 
              className={`${styles.link} ${isActive('/services') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Services</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/workshops" 
              className={`${styles.link} ${isActive('/workshops') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Workshops</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/ieee-support" 
              className={`${styles.link} ${isActive('/ieee-support') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>IEEE</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/portfolio" 
              className={`${styles.link} ${isActive('/portfolio') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Portfolio</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/about" 
              className={`${styles.link} ${isActive('/about') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>About</span>
              <span className={styles.linkUnderline}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`${styles.link} ${isActive('/contact') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Contact</span>
              <span className={styles.linkUnderline}></span>
            </Link>
          </nav>
          
          {/* CTA Button (Desktop) */}
          <Link 
            to="/quote" 
            className={styles.ctaBtn}
          >
            <span>Get Quote</span>
            <span className={styles.ctaArrow}>→</span>
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Mobile Sidebar Menu */}
      <nav 
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Mobile Menu Header */}
        <div className={styles.mobileHeader}>
          <span className={styles.mobileLogo}>SPACE<span className={styles.logoDot}>.</span></span>
          <button
            className={styles.closeBtn}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Mobile Links */}
        <div className={styles.mobileLinks}>
          <Link 
            to="/" 
            className={`${styles.mobileLink} ${isActive('/') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>🏠</span>
            <span>Home</span>
          </Link>
          <Link 
            to="/services" 
            className={`${styles.mobileLink} ${isActive('/services') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>⚙️</span>
            <span>Services</span>
          </Link>
          <Link 
            to="/workshops" 
            className={`${styles.mobileLink} ${isActive('/workshops') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>🎓</span>
            <span>Workshops</span>
          </Link>
          <Link 
            to="/ieee-support" 
            className={`${styles.mobileLink} ${isActive('/ieee-support') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>📝</span>
            <span>IEEE Support</span>
          </Link>
          <Link 
            to="/portfolio" 
            className={`${styles.mobileLink} ${isActive('/portfolio') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>💼</span>
            <span>Portfolio</span>
          </Link>
          <Link 
            to="/about" 
            className={`${styles.mobileLink} ${isActive('/about') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>ℹ️</span>
            <span>About Us</span>
          </Link>
          <Link 
            to="/contact" 
            className={`${styles.mobileLink} ${isActive('/contact') ? styles.mobileActive : ''}`}
          >
            <span className={styles.mobileLinkIcon}>📧</span>
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile CTA */}
        <Link 
          to="/quote" 
          className={styles.mobileCtaBtn}
        >
          <span>Get a Quote</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>

        {/* Mobile Footer */}
        <div className={styles.mobileFooter}>
          <p>© 2025 SPACE. All rights reserved.</p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
