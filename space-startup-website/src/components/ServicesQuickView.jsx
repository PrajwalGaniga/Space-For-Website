// src/components/ServicesQuickView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesQuickView.module.css';

const coreServices = [
  { 
    icon: '🌐', 
    title: 'Frontend Development', 
    details: 'Modern, responsive UI/UX using React, Next.js, and Vue with stunning animations.',
    backDetails: 'Advanced state management, performance optimization, SEO, and cross-browser compatibility. Build pixel-perfect interfaces that users love.',
    color: '#4AB1F1',
    gradient: 'linear-gradient(135deg, rgba(74, 177, 241, 0.15), rgba(74, 177, 241, 0.05))'
  },
  { 
    icon: '🧱', 
    title: 'Full Stack Development', 
    details: 'End-to-end solutions with MERN, MEAN, Django, and seamless payment integration.',
    backDetails: 'Scalable architecture, RESTful APIs, GraphQL, database design, authentication, deployment, and cloud integration for enterprise-grade applications.',
    color: '#2AF598',
    gradient: 'linear-gradient(135deg, rgba(42, 245, 152, 0.15), rgba(42, 245, 152, 0.05))'
  },
  { 
    icon: '🤖', 
    title: 'AI/Deep Learning', 
    details: 'Computer Vision, NLP, Recommendation Systems, and custom ML models for real impact.',
    backDetails: 'TensorFlow, PyTorch, model training, fine-tuning, deployment, real-time inference, and MLOps pipelines for production-ready AI solutions.',
    color: '#9D4EDD',
    gradient: 'linear-gradient(135deg, rgba(157, 78, 221, 0.15), rgba(157, 78, 221, 0.05))'
  },
  { 
    icon: '🛠️', 
    title: 'Workshops & Bootcamps', 
    details: 'Intensive hands-on training in Web Development, AI/ML, and modern deployment practices.',
    backDetails: 'Real-world projects, expert mentorship, career guidance, portfolio building, and industry-recognized certification programs.',
    color: '#FB9228',
    gradient: 'linear-gradient(135deg, rgba(251, 146, 40, 0.15), rgba(251, 146, 40, 0.05))'
  },
  { 
    icon: '🧑‍🏫', 
    title: 'Corporate Training', 
    details: 'Customized full-stack and Data Science programs for upskilling professional teams.',
    backDetails: 'Tailored curriculum, team workshops, progress tracking, hands-on labs, and ongoing support for maximum ROI.',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))'
  },
  { 
    icon: '📝', 
    title: 'IEEE Paper Assistance', 
    details: 'Complete support from topic selection to implementation and conference submission.',
    backDetails: 'Research guidance, literature review, code implementation, paper writing, formatting, plagiarism check, and publication support.',
    color: '#4AB1F1',
    gradient: 'linear-gradient(135deg, rgba(74, 177, 241, 0.15), rgba(74, 177, 241, 0.05))'
  },
];

function ServicesQuickView() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [viewMode, setViewMode] = useState('carousel');
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Triple services for smooth infinite scroll
  const allServices = [...coreServices, ...coreServices, ...coreServices];

  // Smooth infinite scroll animation
  useEffect(() => {
    if (viewMode !== 'carousel' || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const carousel = carouselRef.current;
    if (!carousel) return;

    const scroll = () => {
      scrollPositionRef.current += 0.5; // Smooth scroll speed
      
      // Seamless loop when reaching middle set
      const cardWidth = 400; // Card width + gap
      const singleSetWidth = coreServices.length * cardWidth;
      
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current = 0;
      }
      
      carousel.scrollLeft = scrollPositionRef.current;
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [viewMode, isPaused, coreServices.length]);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel');
    setActiveCard(null);
    scrollPositionRef.current = 0;
  };

  return (
    <section className={styles.servicesContainer} aria-label="Our core services">
      {/* Enhanced Background */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Section Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.labelBadge}>
          <span className={styles.badgeGlow}></span>
          <span className={styles.badgeIcon}>⚡</span>
          <span>What We Offer</span>
        </div>
        
        <h2 className={styles.sectionTitle}>
          Our <span className={styles.accentWord}>Core</span> Services
        </h2>
        
        <p className={styles.sectionSubtitle}>
          Explore our specialized offerings—from scalable development to advanced AI and academic support.
        </p>

        <button 
          className={styles.viewToggle}
          onClick={toggleViewMode}
          aria-label={`Switch to ${viewMode === 'carousel' ? 'grid' : 'carousel'} view`}
        >
          <span className={styles.toggleIcon}>
            {viewMode === 'carousel' ? '▦' : '⇄'}
          </span>
          <span>{viewMode === 'carousel' ? 'Grid View' : 'Carousel View'}</span>
        </button>
      </div>

      {/* Carousel View */}
      {viewMode === 'carousel' && (
        <div className={styles.carouselSection}>
          <div className={styles.carouselWrapper}>
            <div className={styles.fadeLeft}></div>
            <div className={styles.fadeRight}></div>
            
            <div
              ref={carouselRef}
              className={styles.carouselTrack}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {allServices.map((service, index) => (
                <div
                  key={`service-${index}`}
                  className={`${styles.serviceCard} ${
                    activeCard === index ? styles.flipped : ''
                  }`}
                  onClick={() => handleCardClick(index)}
                  style={{
                    '--card-color': service.color,
                    '--card-gradient': service.gradient
                  }}
                >
                  <div className={styles.cardInner}>
                    {/* Front Face */}
                    <div className={styles.cardFront}>
                      <div className={styles.cardGlow}></div>
                      
                      <div className={styles.iconWrapper}>
                        <div className={styles.iconBg}></div>
                        <span className={styles.cardIcon}>{service.icon}</span>
                        <div className={styles.iconRing}></div>
                      </div>

                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      
                      <p className={styles.cardDescription}>{service.details}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.flipPrompt}>
                          <span className={styles.promptText}>Click to explore</span>
                          <span className={styles.flipArrow}>↻</span>
                        </span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className={styles.cardBack}>
                      <div className={styles.backGlow}></div>
                      
                      <span className={styles.backIcon}>{service.icon}</span>
                      
                      <h3 className={styles.backTitle}>In-Depth Details</h3>
                      
                      <p className={styles.backDescription}>{service.backDetails}</p>

                      <Link to="/services" className={styles.detailsBtn}>
                        <span>View Full Details</span>
                        <span className={styles.btnArrow}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.carouselControls}>
            <div className={styles.statusIndicator}>
              <span className={`${styles.statusDot} ${!isPaused ? styles.active : ''}`}></span>
              <span className={styles.statusText}>
                {isPaused ? 'Paused - Hover to resume' : 'Auto-scrolling - Hover to pause'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className={styles.gridSection}>
          <div className={styles.cardGrid}>
            {coreServices.map((service, index) => (
              <div
                key={`grid-${index}`}
                className={`${styles.serviceCard} ${
                  activeCard === index ? styles.flipped : ''
                }`}
                onClick={() => handleCardClick(index)}
                style={{
                  '--card-color': service.color,
                  '--card-gradient': service.gradient
                }}
              >
                <div className={styles.cardInner}>
                  {/* Front Face */}
                  <div className={styles.cardFront}>
                    <div className={styles.cardGlow}></div>
                    
                    <div className={styles.iconWrapper}>
                      <div className={styles.iconBg}></div>
                      <span className={styles.cardIcon}>{service.icon}</span>
                      <div className={styles.iconRing}></div>
                    </div>

                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    
                    <p className={styles.cardDescription}>{service.details}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.flipPrompt}>
                        <span className={styles.promptText}>Click to explore</span>
                        <span className={styles.flipArrow}>↻</span>
                      </span>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className={styles.cardBack}>
                    <div className={styles.backGlow}></div>
                    
                    <span className={styles.backIcon}>{service.icon}</span>
                    
                    <h3 className={styles.backTitle}>In-Depth Details</h3>
                    
                    <p className={styles.backDescription}>{service.backDetails}</p>

                    <Link to="/services" className={styles.detailsBtn}>
                      <span>View Full Details</span>
                      <span className={styles.btnArrow}>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <span className={styles.ctaIcon}>💡</span>
          <h3 className={styles.ctaTitle}>Need Something Custom?</h3>
          <p className={styles.ctaText}>
            We create tailored solutions for unique challenges. Let's discuss your project.
          </p>
          <Link to="/quote" className={styles.ctaButton}>
            <span>Request Custom Solution</span>
            <span className={styles.ctaSparkle}>✨</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesQuickView;
