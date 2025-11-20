// src/components/Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
import WireframeGlobe from './WireframeGlobe';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const heroRef = useRef(null);
  const particlesRef = useRef([]);

  // Dynamic words for typing effect
  const dynamicWords = [
    'Innovation',
    'Excellence',
    'Intelligence',
    'Solutions'
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % dynamicWords.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced mouse tracking with smooth interpolation
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        targetX = (e.clientX / window.innerWidth - 0.5) * 30;
        targetY = (e.clientY / window.innerHeight - 0.5) * 30;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setMousePosition({ x: currentX, y: currentY });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create dynamic particle system
  useEffect(() => {
    const createParticles = () => {
      const particles = [];
      const particleCount = window.innerWidth > 768 ? 50 : 25;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 25 + 20,
          delay: Math.random() * 8,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      particlesRef.current = particles;
    };

    createParticles();
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);

  return (
    <section 
      ref={heroRef}
      className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}
      aria-label="Hero section"
    >
      {/* Enhanced Background Effects */}
      <div className={styles.backgroundEffects}>
        {/* Animated gradient orbs */}
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        
        {/* Grid pattern overlay */}
        <div className={styles.gridPattern}></div>
        
        {/* Floating particles */}
        {particlesRef.current.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Animated lines */}
        <div className={styles.animatedLines}>
          <div className={styles.line} style={{ '--line-delay': '0s' }}></div>
          <div className={styles.line} style={{ '--line-delay': '2s' }}></div>
          <div className={styles.line} style={{ '--line-delay': '4s' }}></div>
        </div>
      </div>

      <div className={styles.heroContainer}>
        {/* Content Section */}
        <div 
          className={styles.content}
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
          {/* Premium Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeGlow}></span>
            <span className={styles.badgeIcon}>✦</span>
            <span className={styles.badgeText}>Award-Winning Tech Solutions</span>
            <span className={styles.badgePulse}></span>
          </div>

          {/* Headline with Dynamic Word Rotation */}
          <h1 className={styles.headline}>
            <span className={styles.headlineTop}>Building the Future with</span>
            <span className={styles.headlineMain}>
              <span className={styles.staticText}>Tech</span>{' '}
              <span className={`${styles.dynamicWord} ${isTyping ? styles.typing : styles.erasing}`}>
                {dynamicWords[currentWord]}
                <span className={styles.cursor}>|</span>
              </span>
            </span>
            <span className={styles.headlineBottom}>
              Scalable. Powerful. <span className={styles.accentGradient}>Professional.</span>
            </span>
          </h1>
          
          {/* Enhanced Sub-Headline */}
          <p className={styles.subHeadline}>
            From <strong className={styles.highlight}>Full Stack Development</strong> to{' '}
            <strong className={styles.highlight}>AI/Deep Learning</strong> and{' '}
            <strong className={styles.highlight}>IEEE Research</strong>—we deliver
            enterprise-grade solutions that drive real results.
          </p>
          
          {/* CTA Buttons with Advanced Effects */}
          <div className={styles.ctaGroup}>
            <Link 
              to="/quote"
              className={`${styles.ctaButton} ${styles.primary}`}
              aria-label="Get a custom quote"
            >
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>💎</span>
                <span className={styles.buttonText}>Get Custom Quote</span>
                <span className={styles.buttonArrow}>→</span>
              </span>
              <span className={styles.buttonGlow}></span>
              <span className={styles.buttonShine}></span>
            </Link>
            
            <Link 
              to="/services"
              className={`${styles.ctaButton} ${styles.secondary}`}
              aria-label="Explore our services"
            >
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>🚀</span>
                <span className={styles.buttonText}>Explore Services</span>
              </span>
              <span className={styles.secondaryShine}></span>
            </Link>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.indicator}>
              <div className={styles.indicatorIcon}>📦</div>
              <div className={styles.indicatorContent}>
                <div className={styles.indicatorNumber}>
                  <span className={styles.countUp}>500</span>+
                </div>
                <div className={styles.indicatorLabel}>Projects Delivered</div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.indicator}>
              <div className={styles.indicatorIcon}>⭐</div>
              <div className={styles.indicatorContent}>
                <div className={styles.indicatorNumber}>
                  <span className={styles.countUp}>98</span>%
                </div>
                <div className={styles.indicatorLabel}>Client Satisfaction</div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.indicator}>
              <div className={styles.indicatorIcon}>🛡️</div>
              <div className={styles.indicatorContent}>
                <div className={styles.indicatorNumber}>24/7</div>
                <div className={styles.indicatorLabel}>Support Available</div>
              </div>
            </div>
          </div>

          {/* Tech Stack Logos */}
          <div className={styles.techStack}>
            <div className={styles.techStackLabel}>Powered by</div>
            <div className={styles.techLogos}>
              <span className={styles.techLogo} title="React">⚛️</span>
              <span className={styles.techLogo} title="AI/ML">🤖</span>
              <span className={styles.techLogo} title="Node.js">🟢</span>
              <span className={styles.techLogo} title="Python">🐍</span>
              <span className={styles.techLogo} title="Cloud">☁️</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced 3D Visual Container */}
        <div 
          className={styles.visual}
          style={{
            transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${mousePosition.y * -0.5}deg)`,
          }}
        >
          {/* Layered glow effects */}
          <div className={styles.visualGlow}></div>
          <div className={styles.visualGlow2}></div>
          <div className={styles.visualRing}></div>
          <div className={styles.visualRing2}></div>
          
          {/* Globe container */}
          <div className={styles.globeContainer}>
            <WireframeGlobe />
          </div>
          
          {/* Orbiting elements */}
          <div className={styles.orbitingElements}>
            <div className={styles.orbit} style={{ '--orbit-duration': '20s' }}>
              <div className={styles.orbitDot}>
                <span className={styles.orbitIcon}>⚛️</span>
              </div>
            </div>
            <div className={styles.orbit} style={{ '--orbit-duration': '15s' }}>
              <div className={styles.orbitDot}>
                <span className={styles.orbitIcon}>🤖</span>
              </div>
            </div>
            <div className={styles.orbit} style={{ '--orbit-duration': '25s' }}>
              <div className={styles.orbitDot}>
                <span className={styles.orbitIcon}>🚀</span>
              </div>
            </div>
          </div>

          {/* Data visualization bars */}
          <div className={styles.dataViz}>
            <div className={styles.dataBar} style={{ '--bar-height': '60%', '--bar-delay': '0s' }}></div>
            <div className={styles.dataBar} style={{ '--bar-height': '80%', '--bar-delay': '0.2s' }}></div>
            <div className={styles.dataBar} style={{ '--bar-height': '45%', '--bar-delay': '0.4s' }}></div>
            <div className={styles.dataBar} style={{ '--bar-height': '90%', '--bar-delay': '0.6s' }}></div>
            <div className={styles.dataBar} style={{ '--bar-height': '70%', '--bar-delay': '0.8s' }}></div>
          </div>

          {/* Floating code snippets */}
          <div className={styles.codeSnippets}>
            <div className={styles.codeSnippet} style={{ '--snippet-delay': '0s' }}>
              <code>{'<AI />'}</code>
            </div>
            <div className={styles.codeSnippet} style={{ '--snippet-delay': '1s' }}>
              <code>{'React.js'}</code>
            </div>
            <div className={styles.codeSnippet} style={{ '--snippet-delay': '2s' }}>
              <code>{'ML()'}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollWrapper}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <div className={styles.scrollArrows}>
            <span className={styles.arrow}>↓</span>
            <span className={styles.arrow}>↓</span>
            <span className={styles.arrow}>↓</span>
          </div>
        </div>
        <span className={styles.scrollText}>Scroll to explore more</span>
      </div>

      {/* Corner decorations */}
      <div className={styles.cornerDecor} style={{ '--corner': 'top-left' }}></div>
      <div className={styles.cornerDecor} style={{ '--corner': 'top-right' }}></div>
      <div className={styles.cornerDecor} style={{ '--corner': 'bottom-left' }}></div>
      <div className={styles.cornerDecor} style={{ '--corner': 'bottom-right' }}></div>
    </section>
  );
}

export default Hero;