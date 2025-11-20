// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';
import defaultProfile from '../assets/profile/def.png';

const testimonials = [
  {
    name: 'Dr. R. Sharma',
    projectType: 'AI Model Implementation',
    review: "SPACE delivered an incredibly accurate AI model ahead of schedule. Their Deep Learning expertise is unmatched.",
    rating: 5,
    photo: null,
    company: 'Tech Research Labs',
    role: 'Senior Researcher',
    color: '#FF5555', // Red
    gradient: 'linear-gradient(135deg, #FF5555, #FF7777)'
  },
  {
    name: 'M. Khan',
    projectType: 'Full Stack Dashboard',
    review: "The MERN stack dashboard built for our corporate needs is flawless, fast, and extremely secure. Great communication throughout.",
    rating: 5,
    photo: null,
    company: 'DataFlow Systems',
    role: 'Tech Lead',
    color: '#55AA55', // Green
    gradient: 'linear-gradient(135deg, #55AA55, #77CC77)'
  },
  {
    name: 'A. Gupta',
    projectType: 'IEEE Paper Assistance',
    review: "The implementation support for my conference paper was critical. I highly recommend SPACE for academic and research projects.",
    rating: 5,
    photo: null,
    company: 'University Research',
    role: 'PhD Researcher',
    color: '#5555FF', // Blue
    gradient: 'linear-gradient(135deg, #5555FF, #7777FF)'
  },
  {
    name: 'S. Patil',
    projectType: 'Frontend Development',
    review: "Our Next.js frontend looks stunning and performs perfectly. They captured our vision for the UI/UX precisely.",
    rating: 5,
    photo: null,
    company: 'StartupHub',
    role: 'Founder & CEO',
    color: '#FFAA00', // Yellow
    gradient: 'linear-gradient(135deg, #FFAA00, #FFCC33)'
  },
  {
    name: 'P. Desai',
    projectType: 'Mobile App Development',
    review: "Exceptional React Native development with smooth animations and perfect cross-platform functionality. Highly professional team!",
    rating: 5,
    photo: null,
    company: 'MobileFirst Inc',
    role: 'CTO',
    color: '#AA55FF', // Purple
    gradient: 'linear-gradient(135deg, #AA55FF, #CC77FF)'
  },
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
      {i < rating ? '⭐' : '☆'}
    </span>
  ));
};

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState('next');
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance cards
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, currentIndex]);

  const handleNext = () => {
    if (isFlipping) return;
    setDirection('next');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setDirection('prev');
    setIsFlipping(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsFlipping(false);
    }, 600);
  };

  const handleCardClick = (index) => {
    if (isFlipping || index === currentIndex) return;
    
    if (index > currentIndex) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <section className={styles.container}>
      {/* Background Effects */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>💬</span>
          <span>Client Stories</span>
        </div>
        
        <h2 className={styles.title}>
          What Our <span className={styles.accent}>Clients Say</span>
        </h2>
        
        <p className={styles.subtitle}>
          Real feedback from researchers, students, and businesses we've partnered with
        </p>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>98%</span>
            <span className={styles.statLabel}>Satisfaction</span>
          </div>
        </div>
      </div>

      {/* UNO Card Stack */}
      <div className={styles.cardStack}>
        <div className={styles.stackContainer}>
          {testimonials.map((testimonial, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;
            const isPrev = offset === -1 || (currentIndex === 0 && index === testimonials.length - 1);
            const isNext = offset === 1 || (currentIndex === testimonials.length - 1 && index === 0);
            const isVisible = isActive || isPrev || isNext;

            return (
              <div
                key={index}
                className={`${styles.card} ${isActive ? styles.active : ''} ${
                  isFlipping ? styles[direction] : ''
                } ${!isVisible ? styles.hidden : ''}`}
                onClick={() => handleCardClick(index)}
                style={{
                  '--card-color': testimonial.color,
                  '--card-gradient': testimonial.gradient,
                  '--offset': offset,
                  zIndex: isActive ? 100 : isPrev ? 50 : isNext ? 50 : 1,
                  transform: isActive
                    ? 'translateX(0) translateY(0) scale(1) rotateZ(0deg)'
                    : isPrev
                    ? 'translateX(-120px) translateY(40px) scale(0.9) rotateZ(-8deg)'
                    : isNext
                    ? 'translateX(120px) translateY(40px) scale(0.9) rotateZ(8deg)'
                    : 'translateX(0) translateY(60px) scale(0.8)',
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                {/* Card Back Pattern */}
                <div className={styles.cardPattern}></div>
                
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardCorner}>
                    <span className={styles.cardSymbol}>♠</span>
                  </div>
                  <div className={styles.quoteIcon}>"</div>
                  <div className={styles.cardCorner} style={{ transform: 'rotate(180deg)' }}>
                    <span className={styles.cardSymbol}>♠</span>
                  </div>
                </div>

                {/* Rating */}
                <div className={styles.rating}>
                  {renderStars(testimonial.rating)}
                </div>

                {/* Review */}
                <p className={styles.review}>{testimonial.review}</p>

                {/* Client Info */}
                <div className={styles.clientInfo}>
                  <div className={styles.photoWrapper}>
                    <img 
                      src={testimonial.photo || defaultProfile}
                      alt={testimonial.name}
                      className={styles.photo}
                      onError={(e) => { e.target.src = defaultProfile; }}
                    />
                    <div className={styles.photoGlow}></div>
                  </div>
                  <div className={styles.clientDetails}>
                    <h4 className={styles.clientName}>{testimonial.name}</h4>
                    <p className={styles.clientRole}>{testimonial.role}</p>
                    <div className={styles.projectTag}>
                      <span className={styles.tagIcon}>📁</span>
                      <span>{testimonial.projectType}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardCorner}>
                    <span className={styles.cardSymbol}>♠</span>
                  </div>
                  <div className={styles.tapHint}>
                    {isActive && <span className={styles.tapText}>Tap to flip →</span>}
                  </div>
                  <div className={styles.cardCorner} style={{ transform: 'rotate(180deg)' }}>
                    <span className={styles.cardSymbol}>♠</span>
                  </div>
                </div>

                {/* Card Shine Effect */}
                <div className={styles.cardShine}></div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button 
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={handlePrev}
          disabled={isFlipping}
        >
          ←
        </button>
        <button 
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={handleNext}
          disabled={isFlipping}
        >
          →
        </button>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => {
                if (index !== currentIndex) {
                  setCurrentIndex(index);
                }
              }}
              style={{ '--dot-color': testimonials[index].color }}
            />
          ))}
        </div>
        
        <button 
          className={styles.autoPlayBtn}
          onClick={() => setAutoPlay(!autoPlay)}
        >
          <span className={styles.autoPlayIcon}>{autoPlay ? '⏸' : '▶'}</span>
          <span>{autoPlay ? 'Pause' : 'Play'}</span>
        </button>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <h3 className={styles.ctaTitle}>Ready to Join Our Success Stories?</h3>
        <p className={styles.ctaText}>Let's create something amazing together!</p>
        <button className={styles.ctaBtn}>
          <span>Start Your Project</span>
          <span className={styles.ctaArrow}>→</span>
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
