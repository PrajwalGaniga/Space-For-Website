// src/components/IEEESupport.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './IEEESupport.module.css';
import { Link } from 'react-router-dom';

const domains = [
  {
    name: 'Deep Learning & Neural Networks',
    icon: '🧠',
    topics: ['CNNs', 'RNNs', 'Transformers', 'GANs']
  },
  {
    name: 'Image Processing & Computer Vision',
    icon: '👁️',
    topics: ['Object Detection', 'Segmentation', 'Image Enhancement', 'Pattern Recognition']
  },
  {
    name: 'Natural Language Processing',
    icon: '📝',
    topics: ['Sentiment Analysis', 'Text Classification', 'Machine Translation', 'Chatbots']
  },
  {
    name: 'IoT & Wireless Sensor Networks',
    icon: '📡',
    topics: ['Smart Systems', 'Edge Computing', 'Network Protocols', 'Data Aggregation']
  },
  {
    name: 'Cloud Computing & Security',
    icon: '☁️',
    topics: ['Cloud Architecture', 'Cryptography', 'Access Control', 'Secure Computing']
  },
  {
    name: 'Data Mining & Big Data',
    icon: '📊',
    topics: ['Classification', 'Clustering', 'Association Rules', 'Predictive Analytics']
  },
];

const methodologySteps = [
  { 
    step: 1, 
    title: 'Topic Finalization & Research Gap Identification', 
    description: 'Collaborative brainstorming to identify novel research problems with clear academic contribution and societal impact.',
    icon: '🎯',
    duration: '1 week'
  },
  { 
    step: 2, 
    title: 'Literature Review & Proposal Development', 
    description: 'Comprehensive survey of state-of-the-art techniques, identification of research gaps, and formulation of proposed methodology.',
    icon: '📚',
    duration: '2 weeks'
  },
  { 
    step: 3, 
    title: 'Algorithm Design & Implementation', 
    description: 'Rigorous implementation of proposed models using industry-standard tools and frameworks with clean, documented code.',
    icon: '⚙️',
    duration: '3-4 weeks'
  },
  { 
    step: 4, 
    title: 'Experimental Setup & Validation', 
    description: 'Design of experiments, performance metric analysis, statistical validation, and comparison with baseline methods.',
    icon: '🔬',
    duration: '2 weeks'
  },
  { 
    step: 5, 
    title: 'Manuscript Preparation & Formatting', 
    description: 'Professional paper writing following IEEE/ACM guidelines, creation of publication-quality figures, and proper citation formatting.',
    icon: '📄',
    duration: '2 weeks'
  },
  { 
    step: 6, 
    title: 'Submission & Revision Support', 
    description: 'Assistance with conference portal submission, responding to reviewer comments, and iterative improvements.',
    icon: '✅',
    duration: 'Ongoing'
  },
];

const tools = [
  { name: 'Python', icon: '🐍', category: 'Language' },
  { name: 'MATLAB', icon: '📐', category: 'Simulation' },
  { name: 'TensorFlow', icon: '🔥', category: 'Framework' },
  { name: 'PyTorch', icon: '⚡', category: 'Framework' },
  { name: 'Jupyter', icon: '📓', category: 'Environment' },
  { name: 'Overleaf', icon: '📝', category: 'Documentation' },
  { name: 'Google Colab', icon: '☁️', category: 'Platform' },
  { name: 'Git/GitHub', icon: '🔀', category: 'Version Control' },
];

const successMetrics = [
  { value: '50+', label: 'Papers Guided', icon: '📄' },
  { value: '95%', label: 'Acceptance Rate', icon: '✅' },
  { value: '30+', label: 'IEEE Conferences', icon: '🏆' },
  { value: '100%', label: 'Originality', icon: '🎓' },
];

const researchAreas = [
  {
    title: 'Why Research Matters',
    points: [
      'Contributes to the global knowledge base',
      'Develops critical thinking and problem-solving skills',
      'Opens doors for higher education and career opportunities',
      'Addresses real-world challenges through innovation'
    ]
  },
  {
    title: 'Our Commitment to You',
    points: [
      'Personalized mentorship throughout the research journey',
      'Emphasis on ethical research practices and integrity',
      'Focus on learning and skill development',
      'Long-term academic and professional relationship'
    ]
  }
];

function IEEESupport() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
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
              }, index * 80);
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
            <span>Research Guidance & Mentorship</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            IEEE Research Paper<br />
            <span className={styles.accentWord}>Publication Support</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            End-to-end academic guidance for implementing quality research,<br />
            from conceptualization to successful conference publication.
          </p>

          {/* Success Metrics */}
          <div className={styles.metricsGrid}>
            {successMetrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <span className={styles.metricIcon}>{metric.icon}</span>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Research Philosophy Section */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyGrid}>
          {researchAreas.map((area, index) => (
            <div key={index} className={styles.philosophyCard}>
              <h3 className={styles.philosophyTitle}>{area.title}</h3>
              <ul className={styles.philosophyList}>
                {area.points.map((point, i) => (
                  <li key={i} className={styles.philosophyItem}>
                    <span className={styles.philosophyCheck}>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Domains Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Research Domains We Support</h2>
          <p className={styles.sectionSubtitle}>
            Specialized guidance across cutting-edge areas of computer science and engineering
          </p>
        </div>
        
        <div className={styles.domainGrid}>
          {domains.map((domain, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`${styles.domainCard} ${
                visibleCards.includes(index) ? styles.visible : ''
              }`}
            >
              <div className={styles.domainIcon}>{domain.icon}</div>
              <h3 className={styles.domainTitle}>{domain.name}</h3>
              <div className={styles.topicsList}>
                {domain.topics.map((topic, i) => (
                  <span key={i} className={styles.topicTag}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className={styles.methodologySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Research Methodology</h2>
          <p className={styles.sectionSubtitle}>
            A systematic, proven approach to quality research output
          </p>
        </div>

        <div className={styles.timelineWrapper}>
          {methodologySteps.map((item, index) => (
            <div
              key={item.step}
              className={`${styles.stepCard} ${
                activeStep === index ? styles.activeStepCard : ''
              }`}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div className={styles.stepHeader}>
                <div className={styles.stepIconWrapper}>
                  <span className={styles.stepIcon}>{item.icon}</span>
                </div>
                <div className={styles.stepMeta}>
                  <span className={styles.stepNumber}>Step {item.step}</span>
                  <span className={styles.stepDuration}>{item.duration}</span>
                </div>
              </div>
              
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDescription}>{item.description}</p>
              
              {activeStep === index && (
                <div className={styles.stepIndicator}></div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className={styles.totalDuration}>
          <span className={styles.durationIcon}>⏱️</span>
          <span className={styles.durationText}>
            Typical Duration: <strong>6-10 weeks</strong> for implementation + 2-3 weeks for documentation
          </span>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tools & Technologies We Work With</h2>
          <p className={styles.sectionSubtitle}>
            Industry-standard platforms and frameworks for robust research implementation
          </p>
        </div>

        <div className={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <div key={index} className={styles.toolCard}>
              <span className={styles.toolIcon}>{tool.icon}</span>
              <div className={styles.toolInfo}>
                <span className={styles.toolName}>{tool.name}</span>
                <span className={styles.toolCategory}>{tool.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Quality Standards */}
      <section className={styles.qualitySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Quality Standards</h2>
        </div>

        <div className={styles.qualityGrid}>
          <div className={styles.qualityCard}>
            <div className={styles.qualityIcon}>🔍</div>
            <h3 className={styles.qualityTitle}>Originality & Plagiarism-Free</h3>
            <p className={styles.qualityDescription}>
              Every research project is original work. We ensure complete academic integrity 
              with proper citations and zero tolerance for plagiarism.
            </p>
          </div>

          <div className={styles.qualityCard}>
            <div className={styles.qualityIcon}>📊</div>
            <h3 className={styles.qualityTitle}>Rigorous Validation</h3>
            <p className={styles.qualityDescription}>
              Comprehensive experimental validation with statistical analysis, performance 
              metrics, and comparison with established baseline methods.
            </p>
          </div>

          <div className={styles.qualityCard}>
            <div className={styles.qualityIcon}>✍️</div>
            <h3 className={styles.qualityTitle}>Professional Documentation</h3>
            <p className={styles.qualityDescription}>
              Publication-quality writing with clear explanations, proper formatting, and 
              adherence to IEEE/ACM conference guidelines.
            </p>
          </div>

          <div className={styles.qualityCard}>
            <div className={styles.qualityIcon}>🤝</div>
            <h3 className={styles.qualityTitle}>Collaborative Learning</h3>
            <p className={styles.qualityDescription}>
              We guide and teach throughout the process, ensuring you understand every aspect 
              of your research for future academic growth.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Research Outputs */}
      <section className={styles.sampleSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Research Output Examples</h2>
          <p className={styles.sectionSubtitle}>
            Sample visualizations, simulation results, and formatted papers<br />
            (Available for detailed discussion during consultation)
          </p>
        </div>

        <div className={styles.sampleGrid}>
          <div className={styles.samplePlaceholder}>
            <div className={styles.placeholderIcon}>📈</div>
            <p className={styles.placeholderText}>Performance Graphs<br />& Metric Comparisons</p>
          </div>
          <div className={styles.samplePlaceholder}>
            <div className={styles.placeholderIcon}>🖼️</div>
            <p className={styles.placeholderText}>Simulation Outputs<br />& Visualizations</p>
          </div>
          <div className={styles.samplePlaceholder}>
            <div className={styles.placeholderIcon}>📄</div>
            <p className={styles.placeholderText}>Formatted Research Papers<br />& Documentation</p>
          </div>
        </div>

        <p className={styles.sampleNote}>
          <span className={styles.noteIcon}>💡</span>
          <span>Complete research portfolios and case studies shared during consultation sessions</span>
        </p>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaShape1}></div>
          <div className={styles.ctaShape2}></div>
        </div>
        
        <div className={styles.ctaContent}>
          <div className={styles.ctaBadge}>
            <span className={styles.ctaBadgeIcon}>🚀</span>
            <span>Start Your Research Journey</span>
          </div>
          
          <h2 className={styles.ctaTitle}>
            Ready to Begin Your Research Project?
          </h2>
          
          <p className={styles.ctaText}>
            Let's discuss your research ideas and chart a path toward successful publication.<br />
            We're here to guide you every step of the way.
          </p>

          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.ctaPrimary}>
              <span>Discuss Your Research Idea</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
            <Link to="/quote" className={styles.ctaSecondary}>
              Schedule Consultation
            </Link>
          </div>

          <p className={styles.ctaFootnote}>
            <span className={styles.footnoteIcon}>📧</span>
            Free initial consultation to explore your research interests and goals
          </p>
        </div>
      </section>
      
    </div>
  );
}

export default IEEESupport;
