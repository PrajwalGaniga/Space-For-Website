// src/components/ContactUs.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './ContactUs.module.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Contact information
  const contactInfo = {
    email: 'spaceforwebsite@gmail.com',
    phone: '+919110687983',
    whatsapp: '919110687983',
    address: 'Tech Innovation Hub, Bangalore, India',
    mapLink: 'https://maps.app.goo.gl/example'
  };

  // Scroll animations
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.projectType) {
      errors.projectType = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  // Create email template
  const createEmailTemplate = () => {
    const serviceNames = {
      'Frontend': 'Frontend Development',
      'FullStack': 'Full Stack Development',
      'AIDL': 'AI/Deep Learning Project',
      'Workshop': 'Training / Workshop',
      'IEEE': 'IEEE Paper Support',
      'Other': 'Other Inquiry'
    };

    const subject = `New Inquiry: ${serviceNames[formData.projectType]} - ${formData.name}`;
    
    const body = `
Hello SPACE Team,

You have received a new inquiry from your website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone || 'Not provided'}
🎯 Service Needed: ${serviceNames[formData.projectType]}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This inquiry was submitted via the SPACE website contact form.
Please respond within 24 hours for best client experience.

Best regards,
SPACE Website System
    `.trim();

    return { subject, body };
  };

  // Create WhatsApp template
  const createWhatsAppTemplate = () => {
    const serviceNames = {
      'Frontend': 'Frontend Development',
      'FullStack': 'Full Stack Development',
      'AIDL': 'AI/Deep Learning',
      'Workshop': 'Training/Workshop',
      'IEEE': 'IEEE Paper Support',
      'Other': 'General Inquiry'
    };

    const message = `
🌟 *New Project Inquiry from SPACE Website*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
${formData.phone ? `📱 *Phone:* ${formData.phone}` : ''}
🎯 *Service:* ${serviceNames[formData.projectType]}

━━━━━━━━━━━━━━━━
📝 *Message:*
${formData.message}
━━━━━━━━━━━━━━━━

_Sent via SPACE Contact Form_
    `.trim();

    return message;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Create email template
    const { subject, body } = createEmailTemplate();
    
    // Open email client
    const emailLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailLink, '_blank');

    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    if (formData.name && formData.projectType && formData.message) {
      const whatsappMessage = createWhatsAppTemplate();
      const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappLink, '_blank');
    } else {
      // Generic WhatsApp message
      const genericMessage = `Hi SPACE Team! I'm interested in your services and would like to discuss a project.`;
      const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(genericMessage)}`;
      window.open(whatsappLink, '_blank');
    }
  };

  // Handle direct email click
  const handleDirectEmail = () => {
    const subject = 'Inquiry from SPACE Website';
    const emailLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}`;
    window.open(emailLink, '_blank');
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* Hero Banner */}
      <header className={styles.headerBanner}>
        <div className={styles.heroBackground}>
          <div className={styles.heroShape1}></div>
          <div className={styles.heroShape2}></div>
          <div className={styles.gridPattern}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>💬</span>
            <span>Get In Touch</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Let's Start a <span className={styles.accentWord}>Conversation</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Have a project in mind? We're here to answer your questions<br />
            and help bring your vision to life.
          </p>

          {/* Quick Contact Options */}
          <div className={styles.quickContactOptions}>
            <button 
              onClick={handleWhatsAppClick}
              className={styles.quickContactBtn}
            >
              <span className={styles.quickIcon}>💬</span>
              <span>WhatsApp</span>
            </button>
            <button 
              onClick={handleDirectEmail}
              className={styles.quickContactBtn}
            >
              <span className={styles.quickIcon}>📧</span>
              <span>Email Us</span>
            </button>
            <a 
              href={`tel:${contactInfo.phone}`}
              className={styles.quickContactBtn}
            >
              <span className={styles.quickIcon}>📞</span>
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <div className={styles.contactContent}>
        
        {/* Contact Form Section */}
        <section 
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`${styles.formContainer} ${
            visibleSections.includes(0) ? styles.visible : ''
          }`}
        >
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              <span className={styles.formIcon}>📝</span>
              Send Us a Message
            </h2>
            <p className={styles.formSubtitle}>
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input 
                type="text" 
                id="name"
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`}
              />
              {formErrors.name && (
                <span className={styles.errorMessage}>{formErrors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address <span className={styles.required}>*</span>
              </label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`${styles.formInput} ${formErrors.email ? styles.inputError : ''}`}
              />
              {formErrors.email && (
                <span className={styles.errorMessage}>{formErrors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number <span className={styles.optional}>(Optional)</span>
              </label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="projectType" className={styles.formLabel}>
                Service Needed <span className={styles.required}>*</span>
              </label>
              <select 
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`${styles.formSelect} ${formErrors.projectType ? styles.inputError : ''}`}
              >
                <option value="">Select a service...</option>
                <option value="Frontend">Frontend Development</option>
                <option value="FullStack">Full Stack Development</option>
                <option value="AIDL">AI/Deep Learning Project</option>
                <option value="Workshop">Training / Workshop</option>
                <option value="IEEE">IEEE Paper Support</option>
                <option value="Other">Other Inquiry</option>
              </select>
              {formErrors.projectType && (
                <span className={styles.errorMessage}>{formErrors.projectType}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Your Message <span className={styles.required}>*</span>
              </label>
              <textarea 
                id="message"
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project requirements, timeline, budget, or any questions you have..."
                rows="6"
                className={`${styles.formTextarea} ${formErrors.message ? styles.inputError : ''}`}
              />
              {formErrors.message && (
                <span className={styles.errorMessage}>{formErrors.message}</span>
              )}
              <span className={styles.charCount}>
                {formData.message.length} characters
              </span>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Sending...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <span className={styles.successIcon}>✓</span>
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className={styles.buttonArrow}>→</span>
                </>
              )}
            </button>

            <p className={styles.formNote}>
              <span className={styles.noteIcon}>💡</span>
              <span>Your information is secure and will never be shared with third parties.</span>
            </p>
          </form>
        </section>
        
        {/* Contact Info Section */}
        <section 
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`${styles.infoContainer} ${
            visibleSections.includes(1) ? styles.visible : ''
          }`}
        >
          <div className={styles.infoHeader}>
            <h2 className={styles.infoTitle}>
              <span className={styles.infoIcon}>📍</span>
              Contact Information
            </h2>
            <p className={styles.infoSubtitle}>
              Prefer to reach out directly? Here's how you can contact us
            </p>
          </div>

          <div className={styles.infoCards}>
            
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📧</div>
              <h3 className={styles.cardTitle}>Email Us</h3>
              <p className={styles.cardDetail}>{contactInfo.email}</p>
              <button 
                onClick={handleDirectEmail}
                className={styles.cardAction}
              >
                Send Email →
              </button>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📱</div>
              <h3 className={styles.cardTitle}>Call or WhatsApp</h3>
              <p className={styles.cardDetail}>{contactInfo.phone}</p>
              <div className={styles.cardActions}>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className={styles.cardActionSmall}
                >
                  Call
                </a>
                <button 
                  onClick={handleWhatsAppClick}
                  className={styles.cardActionSmall}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📍</div>
              <h3 className={styles.cardTitle}>Visit Us</h3>
              <p className={styles.cardDetail}>{contactInfo.address}</p>
              <a 
                href={contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardAction}
              >
                View on Map →
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>⏰</div>
              <h3 className={styles.cardTitle}>Business Hours</h3>
              <p className={styles.cardDetail}>
                Mon - Sat: 9:00 AM - 7:00 PM<br />
                Sunday: Closed
              </p>
              <p className={styles.cardNote}>IST (Indian Standard Time)</p>
            </div>

          </div>

          {/* WhatsApp CTA */}
          <div className={styles.whatsappCta}>
            <div className={styles.whatsappContent}>
              <div className={styles.whatsappIcon}>💬</div>
              <div className={styles.whatsappText}>
                <h3 className={styles.whatsappTitle}>Prefer instant messaging?</h3>
                <p className={styles.whatsappSubtitle}>Chat with us on WhatsApp for quick responses</p>
              </div>
            </div>
            <button 
              onClick={handleWhatsAppClick}
              className={styles.whatsappButton}
            >
              <span className={styles.whatsappBtnIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              <span>Start WhatsApp Chat</span>
            </button>
          </div>

        </section>

      </div>
      
    </div>
  );
}

export default ContactUs;
