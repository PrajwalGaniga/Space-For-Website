// src/components/CTABanner.jsx

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './CTABanner.module.css';

function CTABanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWhatsAppModal, setIsWhatsAppModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const services = [
    'Frontend Development',
    'Full Stack Development',
    'AI/ML Projects',
    'IEEE Paper Assistance',
    'Corporate Training',
    'General Inquiry'
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send Email via EmailJS
  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your EmailJS credentials
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
        'YOUR_TEMPLATE_ID',       // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          to_email: 'prajwalganiga06@gmail.com'
        },
        'YOUR_PUBLIC_KEY'          // Replace with your EmailJS Public Key
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'General Inquiry',
        message: ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open WhatsApp with pre-filled message
  const handleWhatsAppContact = () => {
    const message = `Hi! I'm ${formData.name || '[Your Name]'}. I'm interested in ${formData.service}. ${formData.message || 'I would like to discuss my project.'}`;
    const whatsappUrl = `https://wa.me/919110687983?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Also send email
    if (formData.name && formData.email) {
      sendEmail(new Event('submit'));
    }
    
    setIsWhatsAppModal(false);
  };

  // Direct call handler
  const handleCall = () => {
    window.location.href = 'tel:+919110687983';
  };

  return (
    <>
      <section className={styles.ctaBanner}>
        {/* Animated Background */}
        <div className={styles.backgroundAnimation}>
          <div className={styles.floatingShape1}></div>
          <div className={styles.floatingShape2}></div>
          <div className={styles.gridPattern}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚀</span>
            <span>Let's Build Together</span>
          </div>
          
          <h2 className={styles.title}>
            Ready to Launch Your <span className={styles.highlight}>Next Project?</span>
          </h2>
          
          <p className={styles.subtitle}>
            Get in touch with our expert team today for a consultation and customized quote.
          </p>

          {/* Quick Contact Stats */}
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span className={styles.statIcon}>⚡</span>
              <span>24hr Response</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.statIcon}>💬</span>
              <span>Free Consultation</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.statIcon}>🎯</span>
              <span>Custom Solutions</span>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className={styles.quoteButton}
          >
            <span className={styles.buttonText}>Get a Quote Now</span>
            <span className={styles.buttonIcon}>→</span>
          </button>
          
          <button 
            onClick={() => setIsWhatsAppModal(true)}
            className={styles.whatsappButton}
          >
            <span className={styles.buttonIcon}>💬</span>
            <span className={styles.buttonText}>WhatsApp Us</span>
          </button>

          <button 
            onClick={handleCall}
            className={styles.callButton}
          >
            <span className={styles.buttonIcon}>📞</span>
            <span className={styles.buttonText}>Call Now</span>
          </button>
        </div>
      </section>

      {/* Email/Quote Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeModal}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              <h3>Get Your Free Quote</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours!</p>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  <span className={styles.labelIcon}>👤</span>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    <span className={styles.labelIcon}>📧</span>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">
                    <span className={styles.labelIcon}>📱</span>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service">
                  <span className={styles.labelIcon}>🎯</span>
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">
                  <span className={styles.labelIcon}>💬</span>
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements..."
                  rows="4"
                  className={styles.textarea}
                />
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
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className={styles.submitArrow}>→</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>✓</span>
                  Message sent successfully! We'll contact you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>✕</span>
                  Failed to send message. Please try WhatsApp or call us directly.
                </div>
              )}
            </form>

            <div className={styles.alternateContact}>
              <p>Prefer other methods?</p>
              <div className={styles.alternateButtons}>
                <button onClick={() => {
                  setIsModalOpen(false);
                  setIsWhatsAppModal(true);
                }}>
                  💬 WhatsApp
                </button>
                <button onClick={() => {
                  setIsModalOpen(false);
                  handleCall();
                }}>
                  📞 Call
                </button>
                <a href="mailto:prajwalganiga06@gmail.com" className={styles.emailLink}>
                  📧 Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Quick Connect Modal */}
      {isWhatsAppModal && (
        <div className={styles.modalOverlay} onClick={() => setIsWhatsAppModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeModal}
              onClick={() => setIsWhatsAppModal(false)}
            >
              ✕
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.whatsappIcon}>💬</div>
              <h3>Connect via WhatsApp</h3>
              <p>Fill in your details to start a conversation</p>
            </div>

            <form className={styles.contactForm} onSubmit={(e) => {
              e.preventDefault();
              handleWhatsAppContact();
            }}>
              <div className={styles.formGroup}>
                <label htmlFor="wa-name">Your Name</label>
                <input
                  type="text"
                  id="wa-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="wa-service">Service Interest</label>
                <select
                  id="wa-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="wa-message">Quick Message (Optional)</label>
                <textarea
                  id="wa-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Brief description of your needs..."
                  rows="3"
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.whatsappSubmitButton}>
                <span>Open WhatsApp</span>
                <span className={styles.whatsappArrow}>→</span>
              </button>
            </form>

            <div className={styles.whatsappInfo}>
              <p>📱 We'll respond within minutes during business hours</p>
              <p>🕐 Available: Mon-Sat, 9 AM - 8 PM IST</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CTABanner;
