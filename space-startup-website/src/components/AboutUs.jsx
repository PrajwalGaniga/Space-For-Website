// src/components/AboutUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './AboutUs.module.css';

// Import team member photos
import prajwalImg from '../assets/founders/prajwal.jpg';
import ujwalImg from '../assets/founders/ujwal.jpg';
import varshiniImg from '../assets/founders/varshini.jpg';
import ishuImg from '../assets/founders/ishu.jpg';
import sanviImg from '../assets/founders/sanvi.jpg';

const teamMembers = [
  { 
    name: 'Prajwal P.', 
    role: 'Founder & CTO', 
    expertise: 'AI/DL Specialist',
    bio: 'Driving innovation with expertise in advanced Deep Learning, full-stack development, and system architecture. Passionate about building scalable solutions that solve real-world problems.',
    photo: prajwalImg,
    linkedin: '#',
    github: '#',
    skills: ['Deep Learning', 'System Architecture', 'Full Stack'],
    featured: true
  },
  { 
    name: 'Ujwal', 
    role: 'Full Stack Developer', 
    expertise: 'MERN Stack Expert',
    bio: 'Specializes in building high-performance web applications with modern JavaScript frameworks. Ensures seamless integration between frontend and backend systems.',
    photo: ujwalImg,
    linkedin: '#',
    github: '#',
    skills: ['React', 'Node.js', 'MongoDB']
  },
  { 
    name: 'Varshini', 
    role: 'Research Lead', 
    expertise: 'IEEE & Academic Support',
    bio: 'Guides research projects from conceptualization to publication. Expert in academic writing, research methodology, and conference submissions.',
    photo: varshiniImg,
    linkedin: '#',
    github: '#',
    skills: ['Research', 'LaTeX', 'Academic Writing']
  },
  { 
    name: 'Ishitha', 
    role: 'UI/UX Designer', 
    expertise: 'Design Systems',
    bio: 'Creates intuitive, user-centered designs that balance aesthetics with functionality. Specializes in modern design systems and responsive interfaces.',
    photo: ishuImg,
    linkedin: '#',
    github: '#',
    skills: ['Figma', 'Design Systems', 'User Research']
  },
  { 
    name: 'Sanvi', 
    role: 'AI/ML Engineer', 
    expertise: 'Computer Vision',
    bio: 'Implements cutting-edge machine learning models for real-world applications. Expertise in computer vision, NLP, and model optimization.',
    photo: sanviImg,
    linkedin: '#',
    github: '#',
    skills: ['TensorFlow', 'PyTorch', 'Computer Vision']
  },
];

const companyValues = [
  {
    icon: '🎯',
    title: 'Excellence First',
    description: 'We deliver nothing short of exceptional quality in every project, backed by rigorous testing and continuous improvement.'
  },
  {
    icon: '🤝',
    title: 'Client Partnership',
    description: 'Your success is our success. We work collaboratively, maintaining transparent communication throughout the journey.'
  },
  {
    icon: '🚀',
    title: 'Innovation Driven',
    description: 'We stay ahead of technology trends, constantly learning and adopting cutting-edge tools to provide modern solutions.'
  },
  {
    icon: '💡',
    title: 'Knowledge Sharing',
    description: 'We believe in empowering clients and students through education, guidance, and long-term skill development.'
  }
];

const achievements = [
  { number: '500+', label: 'Projects Delivered', icon: '📦' },
  { number: '50+', label: 'IEEE Papers Published', icon: '📄' },
  { number: '1,670+', label: 'Students Trained', icon: '🎓' },
  { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
];

function AboutUs() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const sectionRefs = useRef([]);

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleSections.includes(index)) {
              setTimeout(() => {
                setVisibleSections((prev) => [...prev, index]);
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleSections]);

  return (
    <div className={styles.aboutContainer}>
      
      {/* Hero Banner */}
      <section className={styles.headerBanner}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.gridPattern}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>🌟</span>
            <span>About Our Company</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.accentWord}>SPACE</span>.
          </h1>
          
          <p className={styles.heroSubtitle}>
            Your trusted partner for scalable tech solutions,<br />
            professional excellence, and innovation that matters.
          </p>

          {/* Achievement Stats */}
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <span className={styles.achievementIcon}>{achievement.icon}</span>
                <span className={styles.achievementNumber}>{achievement.number}</span>
                <span className={styles.achievementLabel}>{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`${styles.section} ${styles.storySection} ${
          visibleSections.includes(0) ? styles.visible : ''
        }`}
      >
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>📖</span>
              <span>Our Story</span>
            </div>
            
            <h2 className={styles.sectionTitle}>Who We Are</h2>
            
            <p className={styles.storyParagraph}>
              SPACE is a technology consultancy and development hub dedicated to bridging the gap between cutting-edge research and practical, scalable applications. Founded by passionate technologists, we empower startups, students, and corporate teams with expertise across the full technology spectrum.
            </p>
            
            <p className={styles.storyParagraph}>
              What makes us unique is our integrated approach—combining top-tier development skills with deep academic knowledge. We offer specialized services like IEEE paper implementation that few agencies can match, while maintaining the agility and innovation of a modern tech startup.
            </p>

            <div className={styles.storyHighlight}>
              <span className={styles.highlightIcon}>💡</span>
              <p className={styles.highlightText}>
                "We don't just build technology—we create solutions that drive measurable success and lasting impact."
              </p>
            </div>
          </div>

          <div className={styles.storyVisual}>
            <div className={styles.visualCard}>
              <h3 className={styles.visualTitle}>Our Mission</h3>
              <p className={styles.visualText}>
                To deliver innovative, high-quality, and transparent technology services that empower our clients to achieve their goals in the digital age.
              </p>
            </div>
            <div className={styles.visualCard}>
              <h3 className={styles.visualTitle}>Our Vision</h3>
              <p className={styles.visualText}>
                To be the global benchmark for technical excellence, known for combining cutting-edge innovation with unwavering commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section 
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`${styles.section} ${styles.valuesSection} ${
          visibleSections.includes(1) ? styles.visible : ''
        }`}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span className={styles.badgeIcon}>💎</span>
            <span>Core Values</span>
          </div>
          <h2 className={styles.sectionTitle}>What Drives Us</h2>
          <p className={styles.sectionSubtitle}>
            The principles that guide every decision we make and every project we deliver
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {companyValues.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`${styles.section} ${styles.teamSection} ${
          visibleSections.includes(2) ? styles.visible : ''
        }`}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span className={styles.badgeIcon}>👥</span>
            <span>Our Team</span>
          </div>
          <h2 className={styles.sectionTitle}>Meet the Minds Behind SPACE</h2>
          <p className={styles.sectionSubtitle}>
            Talented individuals passionate about technology, innovation, and making a difference
          </p>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`${styles.teamMemberCard} ${
                member.featured ? styles.featuredMember : ''
              } ${activeTeamMember === index ? styles.activeMember : ''}`}
              onMouseEnter={() => setActiveTeamMember(index)}
              onMouseLeave={() => setActiveTeamMember(null)}
            >
              {member.featured && (
                <div className={styles.featuredBadge}>
                  <span className={styles.featuredIcon}>⭐</span>
                  <span>Founder</span>
                </div>
              )}

              <div className={styles.memberImageWrapper}>
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className={styles.memberPhoto}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.socialLinks}>
                    <a href={member.linkedin} className={styles.socialLink} aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href={member.github} className={styles.socialLink} aria-label="GitHub">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.memberContent}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberExpertise}>{member.expertise}</p>
                <p className={styles.memberBio}>{member.bio}</p>

                <div className={styles.memberSkills}>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`${styles.section} ${styles.trustSection} ${
          visibleSections.includes(3) ? styles.visible : ''
        }`}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>Why Choose Us</span>
          </div>
          <h2 className={styles.sectionTitle}>What Sets Us Apart</h2>
        </div>

        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <div className={styles.trustNumber}>01</div>
            <h3 className={styles.trustTitle}>Unmatched Experience</h3>
            <p className={styles.trustDescription}>
              Years of hands-on experience delivering complex projects for both corporate giants and agile startups across diverse industries.
            </p>
          </div>

          <div className={styles.trustCard}>
            <div className={styles.trustNumber}>02</div>
            <h3 className={styles.trustTitle}>Quality Guaranteed</h3>
            <p className={styles.trustDescription}>
              Rigorous testing, comprehensive code reviews, and adherence to industry best practices ensure every deliverable exceeds expectations.
            </p>
          </div>

          <div className={styles.trustCard}>
            <div className={styles.trustNumber}>03</div>
            <h3 className={styles.trustTitle}>Transparent Communication</h3>
            <p className={styles.trustDescription}>
              Clear, frequent updates keep you informed at every stage. We believe in partnership, not just project delivery.
            </p>
          </div>

          <div className={styles.trustCard}>
            <div className={styles.trustNumber}>04</div>
            <h3 className={styles.trustTitle}>Competitive Pricing</h3>
            <p className={styles.trustDescription}>
              Enterprise-quality services delivered at transparent, fair rates suitable for startups, students, and established businesses alike.
            </p>
          </div>
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
            Ready to Work Together?
          </h2>
          <p className={styles.ctaText}>
            Let's discuss how we can help bring your vision to life with cutting-edge technology and expert guidance.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.ctaPrimary}>
              <span>Get in Touch</span>
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

export default AboutUs;
