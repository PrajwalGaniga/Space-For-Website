// src/components/ServicesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ServicesPage.module.css';
import { Link } from 'react-router-dom';

const allServices = [
  {
    id: 'frontend',
    title: 'Frontend Website Development',
    icon: '🌐',
    category: 'development',
    description: 'Creating stunning, high-performance, and responsive user interfaces (UI) that deliver exceptional user experience (UX).',
    tools: ['React', 'Next.js', 'Vue.js', 'Modular CSS', 'Figma'],
    deliveryTime: '2-4 Weeks',
    price: 'Starting at ₹15,000',
    portfolioExample: 'prajwal-p-portfolio.netlify.app',
    portfolioLink: 'https://prajwal-p-portfolio.netlify.app/',
    details: [
      'Modern designs focused on conversion',
      'Pixel-perfect, responsive cross-browser compatibility',
      'Performance optimization & SEO',
      'Progressive Web App (PWA) support'
    ],
    features: {
      responsive: true,
      deployment: true,
      maintenance: true,
      support: '3 months',
      revisions: '3 rounds'
    },
    testimonial: {
      text: "Transformed our digital presence completely!",
      author: "Tech Startup CEO"
    },
    popular: true,
    badge: 'Best Seller'
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    icon: '🧱',
    category: 'development',
    description: 'Building robust, scalable server-side architecture and integrating databases, ensuring complete end-to-end functionality.',
    tools: ['MERN Stack', 'MEAN Stack', 'Django + React', 'Payment Gateways', 'AWS/Azure'],
    deliveryTime: '4-12 Weeks',
    price: 'Starting at ₹50,000',
    portfolioExample: 'smart-classroom-x7xs.onrender.com',
    portfolioLink: 'https://smart-classroom-x7xs.onrender.com/',
    details: [
      'Secure API design and development',
      'Implementation of Admin Dashboards',
      'Integration with third-party services',
      'Database design & optimization'
    ],
    features: {
      responsive: true,
      deployment: true,
      maintenance: true,
      support: '6 months',
      revisions: '5 rounds'
    },
    testimonial: {
      text: "Delivered a production-ready app in record time!",
      author: "EdTech Founder"
    },
    popular: true,
    badge: 'Enterprise Ready'
  },
  {
    id: 'ai-dl',
    title: 'AI & Deep Learning Projects',
    icon: '🤖',
    category: 'ai-ml',
    description: 'Developing custom machine learning models to solve complex business and research problems, from data analysis to deployment.',
    tools: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn'],
    deliveryTime: '8-16 Weeks',
    price: 'Starting at ₹80,000',
    portfolioExample: 'MediLink-AI',
    portfolioLink: 'https://github.com/PrajwalGaniga/MediLink-AI',
    details: [
      'Computer Vision (image/video analysis)',
      'Natural Language Processing (NLP)',
      'Recommendation systems and predictive models',
      'Model deployment & API integration'
    ],
    features: {
      responsive: false,
      deployment: true,
      maintenance: true,
      support: '12 months',
      revisions: 'Iterative'
    },
    testimonial: {
      text: "Cutting-edge AI solution that exceeded expectations!",
      author: "Healthcare CTO"
    },
    popular: true,
    badge: 'Premium'
  },
  {
    id: 'training',
    title: 'Corporate & Student Training',
    icon: '🧑‍🏫',
    category: 'education',
    description: 'Hands-on, intensive programs designed to upskill individuals and teams in the latest in-demand technologies.',
    tools: ['Full Stack Bootcamps', 'Data Science Training', 'Certification Courses', 'Live Projects'],
    deliveryTime: '4-8 Weeks',
    price: 'Starting at ₹10,000/person',
    portfolioExample: 'Customized training for ABC Corp',
    portfolioLink: '#portfolio',
    details: [
      'Certification upon completion',
      'Focus on practical, real-world implementation',
      'Flexible scheduling options',
      'One-on-one mentorship available'
    ],
    features: {
      responsive: false,
      deployment: false,
      maintenance: false,
      support: 'Ongoing',
      revisions: 'N/A'
    },
    testimonial: {
      text: "Upskilled our entire team in just 6 weeks!",
      author: "HR Manager"
    },
    popular: false,
    badge: 'Certified'
  },
  {
    id: 'ieee',
    title: 'IEEE Paper Publication Assistance',
    icon: '📝',
    category: 'academic',
    description: 'Comprehensive support for academic projects, ensuring successful implementation, documentation, and publication in reputable conferences.',
    tools: ['MATLAB', 'Python', 'LaTeX', 'Domain-Specific Tools', 'Research Methods'],
    deliveryTime: '6-10 Weeks',
    price: 'Starting at ₹30,000',
    portfolioExample: 'Sample research papers',
    portfolioLink: '#portfolio',
    details: [
      'Topic selection and literature review support',
      'High-quality implementation and validation',
      'Conference submission and formatting assistance',
      'Plagiarism-free original work'
    ],
    features: {
      responsive: false,
      deployment: false,
      maintenance: false,
      support: 'Until publication',
      revisions: 'Unlimited'
    },
    testimonial: {
      text: "Published in IEEE conference within 3 months!",
      author: "PhD Scholar"
    },
    popular: false,
    badge: 'Academic'
  },
  {
    id: 'custom',
    title: 'Custom Project Development',
    icon: '🚀',
    category: 'custom',
    description: 'Tailored solutions for unique student or corporate requirements that fall outside standard service packages.',
    tools: ['Based on requirement', 'Embedded Systems', 'IoT', 'Blockchain', 'Mobile Apps'],
    deliveryTime: 'Varies',
    price: 'Custom Quote',
    portfolioExample: 'Case studies available',
    portfolioLink: '#portfolio',
    details: [
      'Dedicated project manager',
      'Phase-wise delivery and reviews',
      'IP protection and confidentiality',
      'Post-deployment support'
    ],
    features: {
      responsive: true,
      deployment: true,
      maintenance: true,
      support: 'Custom',
      revisions: 'Custom'
    },
    testimonial: {
      text: "Handled our complex IoT project brilliantly!",
      author: "Innovation Director"
    },
    popular: false,
    badge: 'Flexible'
  },
];

const categories = [
  { id: 'all', label: 'All Services', icon: '🎯' },
  { id: 'development', label: 'Development', icon: '💻' },
  { id: 'ai-ml', label: 'AI/ML', icon: '🤖' },
  { id: 'education', label: 'Training', icon: '📚' },
  { id: 'academic', label: 'Academic', icon: '📝' },
  { id: 'custom', label: 'Custom', icon: '🚀' },
];

function ServicesPage() {
  const [activeService, setActiveService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSticky, setIsSticky] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  
  const sidebarRef = useRef(null);
  const cardRefs = useRef([]);

  // Handle sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const offset = window.scrollY;
        setIsSticky(offset > 300);
        
        // Update active service based on scroll position
        cardRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveService(filteredServices[index]?.id);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-triggered animations with stagger
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
  }, [visibleCards, selectedCategory]);

  // Filter services
  const filteredServices = allServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Reset visible cards when filter changes
  useEffect(() => {
    setVisibleCards([]);
  }, [selectedCategory, searchQuery]);

  // Smooth scroll to service
  const scrollToService = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveService(id);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Header */}
      <header className={styles.headerBanner}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.heroShape3}></div>
          <div className={styles.gridPattern}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>⚡</span>
            <span>Premium Tech Services</span>
            <span className={styles.badgePulse}></span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Comprehensive Tech <br />
            <span className={styles.accentWord}>Solutions</span> for Every Need
          </h1>
          
          <p className={styles.heroSubtitle}>
            From foundational development to cutting-edge AI and academic publishing,<br />
            we deliver excellence across the complete technology spectrum.
          </p>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search services, technologies, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search services"
            />
            {searchQuery && (
              <button 
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryButton} ${
                  selectedCategory === cat.id ? styles.active : ''
                }`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                }}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catLabel}>{cat.label}</span>
                {selectedCategory === cat.id && (
                  <span className={styles.activeIndicator}></span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.quickStat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.quickStat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support Available</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sticky Sidebar Navigation */}
        <aside 
          ref={sidebarRef}
          className={`${styles.sidebar} ${isSticky ? styles.stickyActive : ''}`}
        >
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarHeader}>
              <h4 className={styles.sidebarTitle}>
                <span className={styles.sidebarIcon}>📑</span>
                Quick Jump
              </h4>
              <span className={styles.serviceCount}>{filteredServices.length}</span>
            </div>
            
            <ul className={styles.sidebarNav}>
              {filteredServices.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToService(service.id)}
                    className={`${styles.sidebarLink} ${
                      activeService === service.id ? styles.activeSidebar : ''
                    }`}
                  >
                    <span className={styles.serviceIcon}>{service.icon}</span>
                    <div className={styles.sidebarLinkContent}>
                      <span className={styles.sidebarLinkTitle}>{service.title}</span>
                      <span className={styles.sidebarLinkPrice}>{service.price}</span>
                    </div>
                    {service.popular && (
                      <span className={styles.popularBadge}>🔥</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button 
              className={styles.comparisonButton}
              onClick={() => setShowComparison(!showComparison)}
            >
              <span className={styles.compareIcon}>📊</span>
              <span>{showComparison ? 'Hide' : 'Compare'} Services</span>
              <span className={styles.compareArrow}>{showComparison ? '↑' : '→'}</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Results Info */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className={styles.resultsInfo}>
              <p className={styles.resultsText}>
                Showing <strong>{filteredServices.length}</strong> {filteredServices.length === 1 ? 'service' : 'services'}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
              </p>
              {(searchQuery || selectedCategory !== 'all') && (
                <button 
                  className={styles.clearFilters}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Comparison Table */}
          {showComparison && filteredServices.length >= 2 && (
            <div className={`${styles.comparisonTable} ${styles.fadeIn}`}>
              <div className={styles.comparisonHeader}>
                <h3 className={styles.comparisonTitle}>
                  <span className={styles.compareIconLarge}>📊</span>
                  Service Comparison
                </h3>
                <p className={styles.comparisonSubtitle}>
                  Compare features, pricing, and delivery times side-by-side
                </p>
              </div>
              
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.featureColumn}>Feature</th>
                      {filteredServices.slice(0, 3).map((service) => (
                        <th key={service.id} className={styles.serviceColumn}>
                          <div className={styles.tableHeader}>
                            <span className={styles.tableIcon}>{service.icon}</span>
                            <span className={styles.tableTitle}>{service.title}</span>
                            {service.popular && (
                              <span className={styles.tablePopular}>Most Popular</span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>⏱️</span>
                        Delivery Time
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>{service.deliveryTime}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>💰</span>
                        Starting Price
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>
                          <strong className={styles.tablePrice}>{service.price}</strong>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>📱</span>
                        Responsive Design
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>
                          <span className={service.features.responsive ? styles.checkmark : styles.dash}>
                            {service.features.responsive ? '✓' : '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>🚀</span>
                        Deployment
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>
                          <span className={service.features.deployment ? styles.checkmark : styles.dash}>
                            {service.features.deployment ? '✓' : '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>🛠️</span>
                        Support Period
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>
                          <span className={styles.supportBadge}>{service.features.support}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className={styles.featureLabel}>
                        <span className={styles.featureIcon}>🔄</span>
                        Revisions
                      </td>
                      {filteredServices.slice(0, 3).map((service) => (
                        <td key={service.id}>{service.features.revisions}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Service Cards */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`${styles.serviceCard} ${
                  visibleCards.includes(index) ? styles.visible : ''
                } ${service.popular ? styles.popularCard : ''} ${
                  expandedCard === service.id ? styles.expanded : ''
                }`}
              >
                {service.popular && (
                  <div className={styles.popularTag}>
                    <span className={styles.popularIcon}>🔥</span>
                    <span>Most Popular</span>
                  </div>
                )}

                {service.badge && (
                  <div className={styles.serviceBadge}>
                    {service.badge}
                  </div>
                )}

                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleSection}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.cardIcon}>{service.icon}</span>
                      <div className={styles.iconRing}></div>
                      <div className={styles.iconGlow}></div>
                    </div>
                    <div className={styles.titleContent}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <div className={styles.priceTag}>
                        <span className={styles.priceIcon}>💎</span>
                        <span className={styles.price}>{service.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.deliveryBadge}>
                    <span className={styles.deliveryIcon}>⚡</span>
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>

                {/* Card Description */}
                <p className={styles.cardDescription}>{service.description}</p>

                {/* Details Grid */}
                <div className={styles.cardDetailsGrid}>
                  <div className={styles.detailColumn}>
                    <h4 className={styles.detailTitle}>
                      <span className={styles.detailIcon}>🎯</span>
                      What's Included
                    </h4>
                    <ul className={styles.detailList}>
                      {service.details.map((detail, i) => (
                        <li key={i} className={styles.detailItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.detailColumn}>
                    <h4 className={styles.detailTitle}>
                      <span className={styles.detailIcon}>🛠️</span>
                      Technology Stack
                    </h4>
                    <div className={styles.tools}>
                      {service.tools.map((tool, i) => (
                        <span key={i} className={styles.toolTag}>
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className={styles.featuresSection}>
                      <h4 className={styles.detailTitle}>
                        <span className={styles.detailIcon}>✨</span>
                        Included Features
                      </h4>
                      <div className={styles.featureList}>
                        {service.features.deployment && (
                          <span className={styles.featureBadge}>
                            <span className={styles.featureCheck}>✓</span>
                            Deployment
                          </span>
                        )}
                        {service.features.maintenance && (
                          <span className={styles.featureBadge}>
                            <span className={styles.featureCheck}>✓</span>
                            Maintenance
                          </span>
                        )}
                        <span className={styles.featureBadge}>
                          <span className={styles.featureCheck}>✓</span>
                          {service.features.support} Support
                        </span>
                        <span className={styles.featureBadge}>
                          <span className={styles.featureCheck}>✓</span>
                          {service.features.revisions} Revisions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                {service.testimonial && (
                  <div className={styles.testimonialSection}>
                    <div className={styles.testimonialQuote}>
                      <span className={styles.quoteIcon}>"</span>
                      <p className={styles.testimonialText}>{service.testimonial.text}</p>
                    </div>
                    <p className={styles.testimonialAuthor}>— {service.testimonial.author}</p>
                  </div>
                )}

                {/* Portfolio Example */}
                <div className={styles.portfolioSection}>
                  <div className={styles.portfolioInfo}>
                    <span className={styles.portfolioIcon}>⭐</span>
                    <span className={styles.portfolioLabel}>Portfolio:</span>
                    <a
                      href={service.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.portfolioLink}
                    >
                      {service.portfolioExample}
                      <span className={styles.externalIcon}>↗</span>
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <Link to="/quote" className={styles.primaryButton}>
                    <span>Start This Project</span>
                    <span className={styles.buttonArrow}>→</span>
                  </Link>
                  
                  <Link to="/contact" className={styles.secondaryButton}>
                    <span className={styles.contactIcon}>📞</span>
                    <span>Consult Now</span>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className={styles.cardGlow}></div>
                <div className={styles.cornerDecor}></div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No services found</h3>
              <p className={styles.emptyText}>
                We couldn't find any services matching your criteria.<br />
                Try adjusting your search or filter settings.
              </p>
              <button 
                className={styles.resetButton}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                <span>Reset All Filters</span>
                <span className={styles.resetIcon}>↻</span>
              </button>
            </div>
          )}

          {/* CTA Section */}
          {filteredServices.length > 0 && (
            <div className={styles.ctaSection}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Ready to Start Your Project?
                </h2>
                <p className={styles.ctaText}>
                  Get a custom quote tailored to your specific requirements in under 24 hours.
                </p>
                <div className={styles.ctaButtons}>
                  <Link to="/quote" className={styles.ctaPrimary}>
                    Get Free Quote
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                  <Link to="/contact" className={styles.ctaSecondary}>
                    Schedule a Call
                  </Link>
                </div>
              </div>
              <div className={styles.ctaBackground}>
                <div className={styles.ctaShape1}></div>
                <div className={styles.ctaShape2}></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ServicesPage;
