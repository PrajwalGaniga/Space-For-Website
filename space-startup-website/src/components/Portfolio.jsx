// src/components/Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './Portfolio.module.css';

// Import actual images
import portfolioImg from '../assets/imgs/portfolio.jpg';
import fullstackImg from '../assets/imgs/fullstack.jpg';
import deeplearningImg from '../assets/imgs/deeplearning.jpg';

const projects = [
  {
    id: 1,
    category: 'Frontend Development',
    categoryTag: 'Frontend',
    image: portfolioImg,
    title: 'Personal Portfolio Website',
    subtitle: 'Interactive 3D Design Experience',
    client: 'Self-Initiated',
    year: '2025',
    duration: '3 weeks',
    techStack: ['React', 'CSS Modules', 'Three.js', 'Netlify'],
    description: 'A sleek, high-performance portfolio featuring dark-mode aesthetics, complex component rendering, and interactive 3D canvas integration. Built with modern React patterns and optimized for exceptional user experience.',
    highlights: [
      'Interactive 3D elements using Three.js',
      'Responsive design across all devices',
      'Performance-optimized with lazy loading',
      'Dark mode with smooth transitions'
    ],
    impact: {
      metric: '98',
      label: 'Lighthouse Score'
    },
    liveLink: 'https://prajwal-p-portfolio.netlify.app/',
    color: '#4AB1F1'
  },
  {
    id: 2,
    category: 'Full Stack Development',
    categoryTag: 'Full Stack',
    image: fullstackImg,
    title: 'Smart Classroom Management',
    subtitle: 'Complete Educational Platform',
    client: 'Academic Institution',
    year: '2025',
    duration: '8 weeks',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
    description: 'A scalable full-stack application for streamlined academic operations, supporting user authentication, material upload, administrative reporting, and real-time collaboration features.',
    highlights: [
      'Secure JWT-based authentication system',
      'Real-time material sharing and updates',
      'Admin dashboard with analytics',
      'Role-based access control (RBAC)'
    ],
    impact: {
      metric: '500+',
      label: 'Active Users'
    },
    liveLink: 'https://smart-classroom-x7xs.onrender.com/',
    color: '#2AF598'
  },
  {
    id: 3,
    category: 'AI & Deep Learning',
    categoryTag: 'AI/DL',
    image: deeplearningImg,
    title: 'MediLink AI',
    subtitle: 'Intelligent Medical Diagnosis System',
    client: 'Health Tech Research',
    year: '2025',
    duration: '10 weeks',
    techStack: ['Python', 'TensorFlow', 'NLP', 'Flask', 'scikit-learn'],
    description: 'Developed an integrated AI system utilizing Natural Language Processing to analyze textual symptom input and provide preliminary differential diagnoses with confidence scores.',
    highlights: [
      'Advanced NLP for symptom analysis',
      'Multi-label classification model',
      'Explainable AI with confidence metrics',
      'RESTful API for easy integration'
    ],
    impact: {
      metric: '87%',
      label: 'Accuracy Rate'
    },
    githubLink: 'https://github.com/PrajwalGaniga/MediLink-AI',
    color: '#9D4EDD'
  },
];

function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectRefs = useRef([]);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleProjects.includes(index)) {
              setTimeout(() => {
                setVisibleProjects((prev) => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleProjects]);

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
            <span className={styles.badgeIcon}>💼</span>
            <span>Featured Work</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Our <span className={styles.accentWord}>Portfolio</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Showcasing exceptional projects across full-stack development,<br />
            AI innovation, and cutting-edge frontend experiences.
          </p>

          {/* Portfolio Stats */}
          <div className={styles.portfolioStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{projects.length}</span>
              <span className={styles.statLabel}>Featured Projects</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Technology Domains</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Showcase */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsWrapper}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`${styles.projectCard} ${
                visibleProjects.includes(index) ? styles.visible : ''
              } ${activeProject === project.id ? styles.active : ''}`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Image Section */}
              <div className={styles.projectImageWrapper}>
                <div 
                  className={styles.projectImage}
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                  }}
                >
                  <div className={styles.imageOverlay}></div>
                  
                  {/* Category Badge */}
                  <div className={styles.categoryBadge}>
                    <span className={styles.categoryIcon}>
                      {project.categoryTag === 'Frontend' && '💻'}
                      {project.categoryTag === 'Full Stack' && '🧱'}
                      {project.categoryTag === 'AI/DL' && '🤖'}
                    </span>
                    <span>{project.categoryTag}</span>
                  </div>

                  {/* Impact Metric */}
                  <div className={styles.impactBadge}>
                    <span className={styles.impactValue}>{project.impact.metric}</span>
                    <span className={styles.impactLabel}>{project.impact.label}</span>
                  </div>
                </div>

                {/* Hover Overlay with Quick Actions */}
                <div className={styles.hoverOverlay}>
                  <div className={styles.quickActions}>
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.actionButton}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className={styles.actionIcon}>🚀</span>
                        <span>View Live</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.actionButton}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className={styles.actionIcon}>💻</span>
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content Section */}
              <div className={styles.projectContent}>
                {/* Project Header */}
                <div className={styles.projectHeader}>
                  <div className={styles.projectMeta}>
                    <span className={styles.metaClient}>
                      <span className={styles.metaIcon}>👤</span>
                      {project.client}
                    </span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaYear}>{project.year}</span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.metaDuration}>
                      <span className={styles.metaIcon}>⏱️</span>
                      {project.duration}
                    </span>
                  </div>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>

                <p className={styles.projectDescription}>{project.description}</p>

                {/* Tech Stack */}
                <div className={styles.techStackSection}>
                  <h4 className={styles.techStackTitle}>
                    <span className={styles.techIcon}>🛠️</span>
                    Tech Stack
                  </h4>
                  <div className={styles.techStack}>
                    {project.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className={styles.techTag}
                        style={{ '--accent-color': project.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className={styles.highlightsSection}>
                  <h4 className={styles.highlightsTitle}>
                    <span className={styles.highlightIcon}>✨</span>
                    Key Features
                  </h4>
                  <ul className={styles.highlightsList}>
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Links */}
                <div className={styles.projectActions}>
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.primaryAction}
                      style={{ '--accent-color': project.color }}
                    >
                      <span>View Live Project</span>
                      <span className={styles.actionArrow}>→</span>
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.secondaryAction}
                    >
                      <span className={styles.githubIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </span>
                      <span>View on GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Accent Line */}
              <div 
                className={styles.accentLine}
                style={{ background: project.color }}
              ></div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaShape1}></div>
          <div className={styles.ctaShape2}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Build Something Amazing?
          </h2>
          <p className={styles.ctaText}>
            Let's collaborate on your next project and create something extraordinary together.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.ctaPrimary}>
              <span>Start Your Project</span>
              <span className={styles.ctaArrow}>→</span>
            </a>
            <a href="/services" className={styles.ctaSecondary}>
              Explore Services
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Portfolio;
