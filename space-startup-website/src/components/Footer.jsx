// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add your newsletter logic here
  };

  const sections = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about#team' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'Full Stack Development', path: '/services#fullstack' },
      { name: 'AI/Deep Learning', path: '/services#ai' },
      { name: 'IEEE Paper Support', path: '/ieee-support' },
      { name: 'Workshops & Training', path: '/workshops' },
    ],
    resources: [
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Blog', path: '/blog' },
      { name: 'Case Studies', path: '/portfolio#cases' },
      { name: 'Documentation', path: '/docs' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Sitemap', path: '/sitemap' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com', color: '#0077B5' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com', color: '#333333' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com', color: '#E4405F' },
    { name: 'YouTube', icon: '🎥', url: 'https://youtube.com', color: '#FF0000' },
    { name: 'Discord', icon: '💬', url: 'https://discord.com', color: '#5865F2' },
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.container}>
        {/* Top Section - Brand & Newsletter */}
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoText}>SPACE</span>
              <span className={styles.logoDot}>.</span>
            </Link>
            <p className={styles.tagline}>
              Building the future with innovative tech solutions
            </p>
            <p className={styles.description}>
              We specialize in Full Stack Development, AI/Deep Learning, and IEEE Paper assistance—delivering fast, high-quality, and professional services.
            </p>
            
            {/* Social Links */}
            <div className={styles.socialSection}>
              <h4 className={styles.socialTitle}>Follow Us</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ '--social-color': social.color }}
                    aria-label={social.name}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Subscribe to our newsletter for the latest tech insights and updates
            </p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.subscribeBtn}>
                  <span>Subscribe</span>
                  <span className={styles.btnArrow}>→</span>
                </button>
              </div>
            </form>
            
            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>98%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          {/* Company */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Company</h4>
            <ul className={styles.linkList}>
              {sections.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.link}>
                    <span className={styles.linkIcon}>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Services</h4>
            <ul className={styles.linkList}>
              {sections.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.link}>
                    <span className={styles.linkIcon}>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Resources</h4>
            <ul className={styles.linkList}>
              {sections.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.link}>
                    <span className={styles.linkIcon}>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className={styles.linkCol}>
            <h4 className={styles.linkTitle}>Legal & Contact</h4>
            <ul className={styles.linkList}>
              {sections.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={styles.link}>
                    <span className={styles.linkIcon}>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <a href="mailto:spaceforwebsite@gmail.com" className={styles.contactLink}>
                <span className={styles.contactIcon}>📧</span>
                <span>spaceforwebsite@gmail.com</span>
              </a>
              <a href="tel:+9199110687983" className={styles.contactLink}>
                <span className={styles.contactIcon}>📞</span>
                <span>+91 99110687983</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SPACE. All rights reserved. Made with ❤️ in India
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>🔒 Secure</span>
            <span className={styles.badge}>✓ Verified</span>
            <span className={styles.badge}>🚀 Fast</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeElements}>
        <div className={styles.gradientBlob1}></div>
        <div className={styles.gradientBlob2}></div>
      </div>
    </footer>
  );
}

export default Footer;
