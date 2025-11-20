// src/components/USPSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './USPSection.module.css';

// Enhanced USP data with more details
const usps = [
  { 
    icon: '🧑‍💻', 
    title: 'Expert Developers', 
    description: 'Senior engineers ensuring robust, clean, and maintainable code for every project.',
    stats: '10+ Years',
    color: '#4AB1F1',
    featured: true,
    particles: 15
  },
  { 
    icon: '🧠', 
    title: 'AI & Deep Learning', 
    description: 'Cutting-edge solutions in Computer Vision, NLP, and custom ML model deployment.',
    stats: '50+ Models',
    color: '#2AF598',
    featured: true,
    particles: 15
  },
  { 
    icon: '📚', 
    title: 'IEEE Paper Support', 
    description: 'Comprehensive assistance from topic selection to conference submission.',
    stats: '95% Success',
    color: '#9D4EDD',
    featured: false,
    particles: 12
  },
  { 
    icon: '⚡', 
    title: 'Fast Delivery', 
    description: 'Optimized workflows and dedicated teams guarantee timely delivery.',
    stats: '2x Faster',
    color: '#F59E42',
    featured: false,
    particles: 12
  },
  { 
    icon: '🎓', 
    title: 'Pro Training', 
    description: 'Hands-on bootcamps and customized corporate training programs.',
    stats: '1,670+ Trained',
    color: '#4AB1F1',
    featured: false,
    particles: 12
  },
];

function USPSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Enhanced intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [visibleCards]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current && window.innerWidth > 768) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className={styles.uspContainer} aria-label="Why choose SPACE">
      {/* Enhanced Animated Background */}
      <div className={styles.sectionBackground}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gridOverlay}></div>
        
        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingParticle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div 
        className={styles.headerWrapper}
        style={{
          transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
        }}
      >
        <div className={styles.labelBadge}>
          <span className={styles.badgeGlow}></span>
          <span className={styles.badgeIcon}>✨</span>
          <span>Our Competitive Edge</span>
        </div>
        
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleLine}>Why Teams Choose</span>
          <span className={styles.titleAccent}>
            <span className={styles.accentWord}>SPACE</span>
            <span className={styles.titleDecor}>?</span>
          </span>
        </h2>
        
        <p className={styles.sectionSubtitle}>
          Combining technical excellence with innovative solutions to deliver results that exceed expectations.
        </p>

        {/* Floating stats */}
        <div className={styles.floatingStats}>
          <div className={styles.statBubble}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statBubble}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Success</span>
          </div>
          <div className={styles.statBubble}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>Support</span>
          </div>
        </div>
      </div>

      {/* Enhanced Card Grid */}
      <div className={styles.cardGrid}>
        {usps.map((usp, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`${styles.uspCard} ${
              usp.featured ? styles.featuredCard : ''
            } ${visibleCards.includes(index) ? styles.visible : ''} ${
              activeCard === index ? styles.activeCard : ''
            }`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              '--card-color': usp.color,
              '--hover-x': activeCard === index ? mousePosition.x * 0.5 : 0,
              '--hover-y': activeCard === index ? mousePosition.y * 0.5 : 0,
            }}
            role="article"
            aria-label={`${usp.title} service`}
          >
            {/* Multiple glow layers */}
            <div className={styles.cardGlowOuter}></div>
            <div className={styles.cardGlowInner}></div>
            
            {/* Animated border */}
            <div className={styles.animatedBorder}></div>
            
            {/* Featured Badge */}
            {usp.featured && (
              <div className={styles.featuredBadge}>
                <span className={styles.badgeStar}>⭐</span>
                <span className={styles.badgeText}>Popular</span>
                <span className={styles.badgePulse}></span>
              </div>
            )}

            {/* Stats Badge */}
            <div className={styles.statsBadge}>
              <span className={styles.statsIcon}>🎯</span>
              <span className={styles.statsValue}>{usp.stats}</span>
            </div>

            {/* Icon Container with 3D effect */}
            <div className={styles.iconContainer}>
              <div className={styles.iconBackground}></div>
              <div className={styles.icon}>
                <span className={styles.iconEmoji}>{usp.icon}</span>
              </div>
              <div className={styles.iconRing1}></div>
              <div className={styles.iconRing2}></div>
              <div className={styles.iconGlow}></div>
            </div>

            {/* Card Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>
                {usp.title}
                <span className={styles.titleShine}></span>
              </h3>
              <p className={styles.cardDescription}>{usp.description}</p>

              {/* Feature tags */}
              <div className={styles.featureTags}>
                <span className={styles.tag}>Premium</span>
                <span className={styles.tag}>Verified</span>
              </div>
            </div>

            {/* Hover Arrow with trail */}
            <div className={styles.hoverArrowContainer}>
              <div className={styles.hoverArrow}>
                <span className={styles.arrowIcon}>→</span>
                <span className={styles.arrowTrail}></span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerBottomRight}></div>
            
            {/* Particle system per card */}
            <div className={styles.cardParticles}>
              {[...Array(usp.particles)].map((_, i) => (
                <div
                  key={i}
                  className={styles.cardParticle}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

            {/* Scanline effect */}
            <div className={styles.scanline}></div>
          </div>
        ))}
      </div>

      {/* Enhanced Bottom CTA */}
      <div className={styles.bottomCTA}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaGlow1}></div>
          <div className={styles.ctaGlow2}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon}>🚀</div>
          <h3 className={styles.ctaTitle}>Ready to Experience Excellence?</h3>
          <p className={styles.ctaText}>
            Join hundreds of satisfied clients who chose SPACE for their success journey.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link to="/quote" className={styles.ctaPrimary}>
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>💎</span>
                <span>Start Your Project</span>
                <span className={styles.buttonArrow}>→</span>
              </span>
              <span className={styles.buttonShine}></span>
            </Link>
            
            <Link to="/contact" className={styles.ctaSecondary}>
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>💬</span>
                <span>Schedule Consultation</span>
              </span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>✓</span>
              <span>100% Satisfaction</span>
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>🔒</span>
              <span>Secure & Confidential</span>
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.trustIcon}>⚡</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default USPSection;
