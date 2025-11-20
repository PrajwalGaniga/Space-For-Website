// src/components/WorkshopsTraining.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './WorkshopsTraining.module.css';
import { Link } from 'react-router-dom';

const workshops = [
  {
    id: 1,
    title: 'Full Stack Web Development Bootcamp',
    duration: '6 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Live Online',
    topics: ['HTML/CSS/JavaScript', 'React.js', 'Node.js & Express', 'MongoDB', 'REST APIs', 'Git & Deployment'],
    participants: '400+',
    icon: '💻',
    price: '₹15,000',
    certificate: true,
    liveProjects: 3,
    rating: 4.8,
    highlights: [
      'Build 3 real-world projects',
      'Portfolio-ready capstone project',
      'Job interview preparation',
      'Lifetime community access'
    ],
    skillsGained: ['Frontend Development', 'Backend Development', 'Database Design', 'API Integration'],
    featured: true,
    nextBatch: 'Dec 15, 2025'
  },
  {
    id: 2,
    title: 'Python for AI & Machine Learning',
    duration: '4 Weeks',
    level: 'Beginner',
    mode: 'Live Online',
    topics: ['Python Fundamentals', 'Pandas & NumPy', 'Scikit-learn', 'Data Visualization', 'ML Algorithms'],
    participants: '650+',
    icon: '🧠',
    price: '₹12,000',
    certificate: true,
    liveProjects: 2,
    rating: 4.7,
    highlights: [
      'Hands-on with real datasets',
      'Kaggle competition preparation',
      'Industry case studies',
      'AI ethics & best practices'
    ],
    skillsGained: ['Python Programming', 'Data Analysis', 'Machine Learning', 'Model Evaluation'],
    featured: true,
    nextBatch: 'Dec 20, 2025'
  },
  {
    id: 3,
    title: 'Advanced Deep Learning with TensorFlow',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
    mode: 'Live Online + Self-paced',
    topics: ['CNNs & Image Processing', 'RNNs & NLP', 'Transformers', 'Model Optimization', 'TensorFlow Serving'],
    participants: '120+',
    icon: '🚀',
    price: '₹25,000',
    certificate: true,
    liveProjects: 4,
    rating: 4.9,
    highlights: [
      'Deploy production-grade models',
      'Research paper implementation',
      'GPU optimization techniques',
      'Industry mentor guidance'
    ],
    skillsGained: ['Deep Learning', 'Neural Networks', 'Model Deployment', 'Cloud ML'],
    featured: false,
    nextBatch: 'Jan 5, 2026'
  },
  {
    id: 4,
    title: 'No-Code Tools for Business Automation',
    duration: '2 Days Workshop',
    level: 'Beginner',
    mode: 'Intensive Weekend',
    topics: ['Zapier Workflows', 'Airtable Databases', 'Webflow Basics', 'Automation Best Practices'],
    participants: '200+',
    icon: '⚙️',
    price: '₹5,000',
    certificate: true,
    liveProjects: 1,
    rating: 4.6,
    highlights: [
      'Automate repetitive tasks',
      'Build without coding',
      'Workflow templates included',
      'Immediate ROI strategies'
    ],
    skillsGained: ['Workflow Automation', 'Process Optimization', 'No-Code Development'],
    featured: false,
    nextBatch: 'Dec 10, 2025'
  },
  {
    id: 5,
    title: 'GitHub & Cloud Deployment Masterclass',
    duration: '1 Week',
    level: 'All Levels',
    mode: 'Live Online',
    topics: ['Git & GitHub Mastery', 'CI/CD Pipelines', 'Netlify & Vercel', 'AWS Fundamentals', 'Docker Basics'],
    participants: '300+',
    icon: '☁️',
    price: '₹8,000',
    certificate: true,
    liveProjects: 2,
    rating: 4.7,
    highlights: [
      'Deploy your first app',
      'DevOps fundamentals',
      'Version control mastery',
      'Cloud cost optimization'
    ],
    skillsGained: ['Git/GitHub', 'CI/CD', 'Cloud Deployment', 'DevOps Basics'],
    featured: false,
    nextBatch: 'Dec 12, 2025'
  },
];

const benefits = [
  {
    icon: '🎓',
    title: 'Industry-Recognized Certificates',
    description: 'Earn certificates that stand out on LinkedIn and resumes'
  },
  {
    icon: '👥',
    title: 'Live Interactive Sessions',
    description: 'Real-time learning with expert instructors and peer collaboration'
  },
  {
    icon: '💼',
    title: 'Career Support',
    description: 'Resume reviews, mock interviews, and job referral assistance'
  },
  {
    icon: '♾️',
    title: 'Lifetime Access',
    description: 'Access course materials and community forever, with free updates'
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Frontend Developer at TCS',
    workshop: 'Full Stack Bootcamp',
    text: 'This bootcamp transformed my career! Landed my first developer role within 2 months of completion.',
    rating: 5,
    image: '👩‍💻'
  },
  {
    name: 'Rahul Verma',
    role: 'Data Scientist at Flipkart',
    workshop: 'Python AI/ML Course',
    text: 'Hands-on projects and real datasets made complex ML concepts crystal clear. Best investment in my career!',
    rating: 5,
    image: '👨‍💼'
  },
  {
    name: 'Anita Desai',
    role: 'Business Analyst',
    workshop: 'No-Code Automation',
    text: 'Saved 15+ hours weekly by automating workflows. No coding required! Highly practical and immediately useful.',
    rating: 5,
    image: '👩‍💼'
  }
];

function WorkshopsTraining() {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const cardRefs = useRef([]);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleCards]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredWorkshops = selectedLevel === 'all' 
    ? workshops 
    : workshops.filter(w => w.level.toLowerCase().includes(selectedLevel));

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <header className={styles.headerBanner}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.gridPattern}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>🎓</span>
            <span>Professional Training Programs</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Transform Your Career with<br />
            <span className={styles.accentWord}>Industry-Leading</span> Workshops
          </h1>
          
          <p className={styles.heroSubtitle}>
            Hands-on, project-based training programs designed to get you job-ready.<br />
            Learn from industry experts and build a portfolio that stands out.
          </p>

          {/* Quick Stats */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1,670+</span>
              <span className={styles.statLabel}>Students Trained</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.8★</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>85%</span>
              <span className={styles.statLabel}>Career Growth</span>
            </div>
          </div>

          {/* Level Filter */}
          <div className={styles.levelFilter}>
            <button 
              className={`${styles.levelButton} ${selectedLevel === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedLevel('all')}
            >
              All Levels
            </button>
            <button 
              className={`${styles.levelButton} ${selectedLevel === 'beginner' ? styles.active : ''}`}
              onClick={() => setSelectedLevel('beginner')}
            >
              Beginner
            </button>
            <button 
              className={`${styles.levelButton} ${selectedLevel === 'intermediate' ? styles.active : ''}`}
              onClick={() => setSelectedLevel('intermediate')}
            >
              Intermediate
            </button>
            <button 
              className={`${styles.levelButton} ${selectedLevel === 'advanced' ? styles.active : ''}`}
              onClick={() => setSelectedLevel('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.sectionTitle}>Why Choose Our Workshops?</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workshops Grid */}
      <section className={styles.workshopsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Workshops</h2>
          <p className={styles.sectionSubtitle}>
            Choose from our curated selection of practical, career-focused training programs
          </p>
        </div>

        <div className={styles.workshopsGrid}>
          {filteredWorkshops.map((workshop, index) => (
            <article
              key={workshop.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`${styles.workshopCard} ${
                visibleCards.includes(index) ? styles.visible : ''
              } ${workshop.featured ? styles.featured : ''}`}
            >
              {workshop.featured && (
                <div className={styles.featuredBadge}>
                  <span className={styles.featuredIcon}>⭐</span>
                  <span>Most Popular</span>
                </div>
              )}

              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.cardIcon}>{workshop.icon}</span>
                  <div className={styles.iconGlow}></div>
                </div>
                
                <div className={styles.ratingBadge}>
                  <span className={styles.star}>★</span>
                  <span className={styles.ratingValue}>{workshop.rating}</span>
                </div>
              </div>

              <h3 className={styles.cardTitle}>{workshop.title}</h3>

              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🕒</span>
                  <span>{workshop.duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📊</span>
                  <span>{workshop.level}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🎥</span>
                  <span>{workshop.mode}</span>
                </div>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.priceTag}>
                  <span className={styles.priceLabel}>Investment</span>
                  <span className={styles.price}>{workshop.price}</span>
                </div>
                <div className={styles.nextBatch}>
                  <span className={styles.batchIcon}>📅</span>
                  <span className={styles.batchDate}>{workshop.nextBatch}</span>
                </div>
              </div>

              <div className={styles.highlightsSection}>
                <h4 className={styles.subsectionTitle}>
                  <span className={styles.subsectionIcon}>✨</span>
                  What You'll Get
                </h4>
                <ul className={styles.highlightsList}>
                  {workshop.highlights.map((highlight, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.topicsSection}>
                <h4 className={styles.subsectionTitle}>
                  <span className={styles.subsectionIcon}>📚</span>
                  Topics Covered
                </h4>
                <div className={styles.topicsList}>
                  {workshop.topics.map((topic, i) => (
                    <span key={i} className={styles.topicTag}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillsSection}>
                <h4 className={styles.subsectionTitle}>
                  <span className={styles.subsectionIcon}>🎯</span>
                  Skills You'll Master
                </h4>
                <div className={styles.skillsList}>
                  {workshop.skillsGained.map((skill, i) => (
                    <span key={i} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.participantsInfo}>
                  <span className={styles.participantsIcon}>👥</span>
                  <span className={styles.participantsCount}>{workshop.participants} trained</span>
                  {workshop.certificate && (
                    <>
                      <span className={styles.dot}>•</span>
                      <span className={styles.certificateIcon}>🏆</span>
                      <span className={styles.certificateText}>Certificate</span>
                    </>
                  )}
                </div>
                
                <Link to="/contact" className={styles.registerButton}>
                  <span>Enroll Now</span>
                  <span className={styles.buttonArrow}>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No workshops found</h3>
            <p className={styles.emptyText}>Try selecting a different skill level</p>
            <button 
              className={styles.resetButton}
              onClick={() => setSelectedLevel('all')}
            >
              Show All Workshops
            </button>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>Student Success Stories</h2>
        <p className={styles.sectionSubtitle}>
          Hear from professionals who transformed their careers with our training
        </p>

        <div className={styles.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${styles.testimonialCard} ${
                index === activeTestimonial ? styles.activeTestimonial : ''
              }`}
            >
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}>
                  {testimonial.image}
                </div>
                <div className={styles.testimonialInfo}>
                  <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                  <p className={styles.testimonialRole}>{testimonial.role}</p>
                  <p className={styles.testimonialWorkshop}>
                    <span className={styles.workshopIcon}>🎓</span>
                    {testimonial.workshop}
                  </p>
                </div>
                <div className={styles.testimonialRating}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className={styles.ratingStar}>★</span>
                  ))}
                </div>
              </div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
            </div>
          ))}

          <div className={styles.carouselIndicators}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === activeTestimonial ? styles.activeIndicator : ''
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate CTA Section */}
      <section className={styles.corporateCta}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaShape1}></div>
          <div className={styles.ctaShape2}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>
            <span className={styles.ctaBadgeIcon}>🏢</span>
            <span>Enterprise Solutions</span>
          </div>
          
          <h2 className={styles.ctaTitle}>
            Looking for Corporate Training?
          </h2>
          
          <p className={styles.ctaText}>
            We design custom training modules tailored to your company's specific needs,<br />
            technology stack, and business objectives. Upskill your entire team efficiently.
          </p>

          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>Customized curriculum</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>Flexible scheduling</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>On-site or remote options</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>Volume discounts available</span>
            </div>
          </div>

          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.corporatePrimary}>
              <span>Request Corporate Quote</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link to="/quote" className={styles.corporateSecondary}>
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkshopsTraining;
