// src/components/GetQuote.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './GetQuote.module.css';

function GetQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: '',
    projectDescription: '',
    budgetRange: '',
    deadline: '',
    additionalRequirements: '',
    referralSource: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const fileInputRef = useRef(null);

  const totalSteps = 4;

  // Contact information
  const contactInfo = {
    email: 'spaceforwebsite@gmail.com',
    whatsapp: '919110687983'
  };

  // Service pricing estimates
  const servicePricing = {
    'Frontend': { min: 15000, max: 50000, currency: '₹' },
    'FullStack': { min: 50000, max: 150000, currency: '₹' },
    'AIDL': { min: 80000, max: 200000, currency: '₹' },
    'IEEE': { min: 30000, max: 80000, currency: '₹' },
    'Training': { min: 10000, max: 50000, currency: '₹' },
    'Custom': { min: 40000, max: 150000, currency: '₹' }
  };

  // Update estimated price when service changes
  useEffect(() => {
    if (formData.serviceNeeded && servicePricing[formData.serviceNeeded]) {
      const pricing = servicePricing[formData.serviceNeeded];
      setEstimatedPrice(pricing);
    }
  }, [formData.serviceNeeded]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }
      setUploadedFile(file);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) errors.phone = 'Phone is required';
    }

    if (step === 2) {
      if (!formData.serviceNeeded) errors.serviceNeeded = 'Please select a service';
      if (!formData.projectDescription.trim()) {
        errors.projectDescription = 'Project description is required';
      } else if (formData.projectDescription.trim().length < 50) {
        errors.projectDescription = 'Please provide at least 50 characters of description';
      }
    }

    if (step === 3) {
      if (!formData.budgetRange) errors.budgetRange = 'Please select a budget range';
      if (!formData.deadline.trim()) errors.deadline = 'Deadline is required';
    }

    return errors;
  };

  // Next step
  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create detailed quote request template
  const createQuoteTemplate = () => {
    const serviceNames = {
      'Frontend': 'Frontend Website Development',
      'FullStack': 'Full Stack Development',
      'AIDL': 'AI/Deep Learning Project',
      'IEEE': 'IEEE Paper Implementation',
      'Training': 'Corporate/Student Training',
      'Custom': 'Custom Project Development'
    };

    const subject = `Custom Quote Request: ${serviceNames[formData.serviceNeeded]} - ${formData.fullName}`;
    
    const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CUSTOM QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Date: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Required: ${serviceNames[formData.serviceNeeded]}

Project Description:
${formData.projectDescription}

${formData.additionalRequirements ? `
Additional Requirements:
${formData.additionalRequirements}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 BUDGET & TIMELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Budget Range: ${formData.budgetRange}
Required Deadline: ${formData.deadline}

${estimatedPrice ? `
📊 Estimated Price Range:
${estimatedPrice.currency}${estimatedPrice.min.toLocaleString('en-IN')} - ${estimatedPrice.currency}${estimatedPrice.max.toLocaleString('en-IN')}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.referralSource ? `How did you hear about us: ${formData.referralSource}` : ''}
${uploadedFile ? `Attachment: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)` : 'No attachments'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ NEXT STEPS:
1. SPACE team will review your requirements
2. You'll receive a detailed quote within 24 hours
3. Schedule a consultation call to discuss further

This request was submitted via the SPACE website quote form.
Please prioritize and respond within 24 hours.

Best regards,
SPACE Quote System
    `.trim();

    return { subject, body };
  };

  // Create WhatsApp template for quote request
  const createWhatsAppQuoteTemplate = () => {
    const serviceNames = {
      'Frontend': 'Frontend Development',
      'FullStack': 'Full Stack Development',
      'AIDL': 'AI/ML Project',
      'IEEE': 'IEEE Paper Support',
      'Training': 'Training/Workshop',
      'Custom': 'Custom Development'
    };

    return `
🎯 *Custom Quote Request*

👤 *Client:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}

━━━━━━━━━━━━━━━━
💼 *Service Needed:*
${serviceNames[formData.serviceNeeded]}

📝 *Project Description:*
${formData.projectDescription.substring(0, 200)}${formData.projectDescription.length > 200 ? '...' : ''}

💰 *Budget:* ${formData.budgetRange}
⏱️ *Deadline:* ${formData.deadline}

━━━━━━━━━━━━━━━━
_Submitted via SPACE Quote Form_
    `.trim();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Create templates
    const { subject, body } = createQuoteTemplate();
    
    // Open email client
    const emailLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailLink, '_blank');

    // Show success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // Send via WhatsApp
  const handleWhatsAppSubmit = () => {
    const whatsappMessage = createWhatsAppQuoteTemplate();
    const whatsappLink = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink, '_blank');
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      serviceNeeded: '',
      projectDescription: '',
      budgetRange: '',
      deadline: '',
      additionalRequirements: '',
      referralSource: ''
    });
    setUploadedFile(null);
    setCurrentStep(1);
    setSubmitSuccess(false);
    setEstimatedPrice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitSuccess) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.successContainer}>
          <div className={styles.successAnimation}>
            <div className={styles.checkmarkCircle}>
              <div className={styles.checkmark}>✓</div>
            </div>
          </div>
          
          <h1 className={styles.successTitle}>Quote Request Submitted!</h1>
          <p className={styles.successMessage}>
            Thank you for your detailed request. Your email client has been opened with your quote details.
            Our team will review your requirements and respond within <strong>24 hours</strong>.
          </p>

          <div className={styles.successDetails}>
            <div className={styles.successInfo}>
              <span className={styles.successIcon}>📧</span>
              <span>Email sent to: {contactInfo.email}</span>
            </div>
            <div className={styles.successInfo}>
              <span className={styles.successIcon}>📋</span>
              <span>Service: {formData.serviceNeeded}</span>
            </div>
            {estimatedPrice && (
              <div className={styles.successInfo}>
                <span className={styles.successIcon}>💰</span>
                <span>Estimated: {estimatedPrice.currency}{estimatedPrice.min.toLocaleString('en-IN')} - {estimatedPrice.currency}{estimatedPrice.max.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          <div className={styles.successActions}>
            <button onClick={handleWhatsAppSubmit} className={styles.whatsappBtn}>
              <span className={styles.whatsappIcon}>💬</span>
              <span>Send via WhatsApp Too</span>
            </button>
            <button onClick={handleReset} className={styles.resetBtn}>
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <span className={styles.badgeIcon}>💎</span>
            <span>Custom Quote Request</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Get Your <span className={styles.accentWord}>Custom Quote</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Tell us about your project in detail. We'll analyze your requirements<br />
            and respond with a comprehensive estimate within 24 hours.
          </p>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className={styles.progressSteps}>
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`${styles.progressStep} ${
                    currentStep >= step ? styles.activeStep : ''
                  } ${currentStep === step ? styles.currentStep : ''}`}
                >
                  <div className={styles.stepNumber}>{step}</div>
                  <span className={styles.stepLabel}>
                    {step === 1 && 'Contact'}
                    {step === 2 && 'Project'}
                    {step === 3 && 'Budget'}
                    {step === 4 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Quote Form */}
      <div className={styles.quoteFormContainer}>
        <form className={styles.quoteForm} onSubmit={handleSubmit}>
          
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <section className={styles.formStep}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepIcon}>👤</span>
                  Your Contact Details
                </h2>
                <p className={styles.stepSubtitle}>
                  Let us know who you are and how to reach you
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.formLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`${styles.formInput} ${formErrors.fullName ? styles.inputError : ''}`}
                  />
                  {formErrors.fullName && (
                    <span className={styles.errorMessage}>{formErrors.fullName}</span>
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
                    placeholder="john@company.com"
                    className={`${styles.formInput} ${formErrors.email ? styles.inputError : ''}`}
                  />
                  {formErrors.email && (
                    <span className={styles.errorMessage}>{formErrors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={`${styles.formInput} ${formErrors.phone ? styles.inputError : ''}`}
                  />
                  {formErrors.phone && (
                    <span className={styles.errorMessage}>{formErrors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>
                    Company/Organization <span className={styles.optional}>(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company Name"
                    className={styles.formInput}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Project Requirements */}
          {currentStep === 2 && (
            <section className={styles.formStep}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepIcon}>🎯</span>
                  Project Requirements
                </h2>
                <p className={styles.stepSubtitle}>
                  Tell us about your project and what you need
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="serviceNeeded" className={styles.formLabel}>
                    Primary Service Needed <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="serviceNeeded"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleInputChange}
                    className={`${styles.formSelect} ${formErrors.serviceNeeded ? styles.inputError : ''}`}
                  >
                    <option value="">Select a service...</option>
                    <option value="Frontend">Frontend Website Development</option>
                    <option value="FullStack">Full Stack Development (Web/App)</option>
                    <option value="AIDL">AI/Deep Learning Model</option>
                    <option value="IEEE">IEEE Paper Implementation/Support</option>
                    <option value="Training">Corporate/Student Training</option>
                    <option value="Custom">Custom Project Development</option>
                  </select>
                  {formErrors.serviceNeeded && (
                    <span className={styles.errorMessage}>{formErrors.serviceNeeded}</span>
                  )}
                </div>

                {estimatedPrice && (
                  <div className={styles.priceEstimate}>
                    <span className={styles.estimateIcon}>💰</span>
                    <div className={styles.estimateContent}>
                      <span className={styles.estimateLabel}>Estimated Price Range:</span>
                      <span className={styles.estimateValue}>
                        {estimatedPrice.currency}{estimatedPrice.min.toLocaleString('en-IN')} - {estimatedPrice.currency}{estimatedPrice.max.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="projectDescription" className={styles.formLabel}>
                    Detailed Project Description <span className={styles.required}>*</span>
                  </label>
                  <textarea 
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your project: key features, goals, target audience, existing platform (if any), specific requirements..."
                    rows="8"
                    className={`${styles.formTextarea} ${formErrors.projectDescription ? styles.inputError : ''}`}
                  />
                  {formErrors.projectDescription && (
                    <span className={styles.errorMessage}>{formErrors.projectDescription}</span>
                  )}
                  <span className={styles.charCount}>
                    {formData.projectDescription.length} characters (min. 50)
                  </span>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="additionalRequirements" className={styles.formLabel}>
                    Additional Requirements <span className={styles.optional}>(Optional)</span>
                  </label>
                  <textarea 
                    id="additionalRequirements"
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInputChange}
                    placeholder="Any specific technologies, integrations, or features you require..."
                    rows="4"
                    className={styles.formTextarea}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Step 3: Budget & Timeline */}
          {currentStep === 3 && (
            <section className={styles.formStep}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepIcon}>💰</span>
                  Budget & Timeline
                </h2>
                <p className={styles.stepSubtitle}>
                  Help us understand your budget and timeline expectations
                </p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="budgetRange" className={styles.formLabel}>
                    Budget Range <span className={styles.required}>*</span>
                  </label>
                  <select 
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className={`${styles.formSelect} ${formErrors.budgetRange ? styles.inputError : ''}`}
                  >
                    <option value="">Select budget range...</option>
                    <option value="<50k">Under ₹50,000</option>
                    <option value="50k-150k">₹50,000 - ₹1,50,000</option>
                    <option value="150k-300k">₹1,50,000 - ₹3,00,000</option>
                    <option value="300k+">Above ₹3,00,000</option>
                    <option value="flexible">Flexible / Needs Discussion</option>
                  </select>
                  {formErrors.budgetRange && (
                    <span className={styles.errorMessage}>{formErrors.budgetRange}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="deadline" className={styles.formLabel}>
                    Required Deadline <span className={styles.required}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    placeholder="e.g., Q1 2026, 8 weeks, Urgent, Flexible"
                    className={`${styles.formInput} ${formErrors.deadline ? styles.inputError : ''}`}
                  />
                  {formErrors.deadline && (
                    <span className={styles.errorMessage}>{formErrors.deadline}</span>
                  )}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.formLabel}>
                    File Upload <span className={styles.optional}>(Optional - Wireframes, Specs, PDFs)</span>
                  </label>
                  <div className={styles.fileUploadArea}>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className={styles.fileInput}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                    />
                    {!uploadedFile ? (
                      <div className={styles.uploadPlaceholder}>
                        <span className={styles.uploadIcon}>📎</span>
                        <p className={styles.uploadText}>
                          Click to upload or drag and drop<br />
                          <span className={styles.uploadSubtext}>PDF, DOC, PNG, JPG (Max 10MB)</span>
                        </p>
                      </div>
                    ) : (
                      <div className={styles.uploadedFile}>
                        <span className={styles.fileIcon}>📄</span>
                        <div className={styles.fileInfo}>
                          <span className={styles.fileName}>{uploadedFile.name}</span>
                          <span className={styles.fileSize}>
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                        <button 
                          type="button"
                          onClick={removeFile}
                          className={styles.removeFile}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="referralSource" className={styles.formLabel}>
                    How did you hear about us? <span className={styles.optional}>(Optional)</span>
                  </label>
                  <select 
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="">Select an option...</option>
                    <option value="Google">Google Search</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Friend/Colleague Referral</option>
                    <option value="Social">Social Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <section className={styles.formStep}>
              <div className={styles.stepHeader}>
                <h2 className={styles.stepTitle}>
                  <span className={styles.stepIcon}>📋</span>
                  Review Your Request
                </h2>
                <p className={styles.stepSubtitle}>
                  Please review your information before submitting
                </p>
              </div>

              <div className={styles.reviewContainer}>
                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewTitle}>Contact Information</h3>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Name:</span>
                      <span className={styles.reviewValue}>{formData.fullName}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Email:</span>
                      <span className={styles.reviewValue}>{formData.email}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Phone:</span>
                      <span className={styles.reviewValue}>{formData.phone}</span>
                    </div>
                    {formData.company && (
                      <div className={styles.reviewItem}>
                        <span className={styles.reviewLabel}>Company:</span>
                        <span className={styles.reviewValue}>{formData.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewTitle}>Project Details</h3>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Service:</span>
                      <span className={styles.reviewValue}>{formData.serviceNeeded}</span>
                    </div>
                    <div className={`${styles.reviewItem} ${styles.fullWidth}`}>
                      <span className={styles.reviewLabel}>Description:</span>
                      <span className={styles.reviewValue}>{formData.projectDescription}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.reviewSection}>
                  <h3 className={styles.reviewTitle}>Budget & Timeline</h3>
                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Budget:</span>
                      <span className={styles.reviewValue}>{formData.budgetRange}</span>
                    </div>
                    <div className={styles.reviewItem}>
                      <span className={styles.reviewLabel}>Deadline:</span>
                      <span className={styles.reviewValue}>{formData.deadline}</span>
                    </div>
                    {uploadedFile && (
                      <div className={styles.reviewItem}>
                        <span className={styles.reviewLabel}>Attachment:</span>
                        <span className={styles.reviewValue}>{uploadedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {estimatedPrice && (
                  <div className={styles.priceEstimateLarge}>
                    <span className={styles.estimateIconLarge}>💰</span>
                    <div className={styles.estimateContentLarge}>
                      <span className={styles.estimateLabelLarge}>Estimated Investment Range:</span>
                      <span className={styles.estimateValueLarge}>
                        {estimatedPrice.currency}{estimatedPrice.min.toLocaleString('en-IN')} - {estimatedPrice.currency}{estimatedPrice.max.toLocaleString('en-IN')}
                      </span>
                      <span className={styles.estimateNote}>
                        *Final quote will be provided within 24 hours based on detailed requirements
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Navigation Buttons */}
          <div className={styles.formNavigation}>
            {currentStep > 1 && (
              <button 
                type="button"
                onClick={handlePrevious}
                className={styles.navButton}
              >
                <span className={styles.navArrow}>←</span>
                <span>Previous</span>
              </button>
            )}
            
            <div className={styles.navSpacer}></div>

            {currentStep < totalSteps ? (
              <button 
                type="button"
                onClick={handleNext}
                className={styles.navButtonPrimary}
              >
                <span>Next Step</span>
                <span className={styles.navArrow}>→</span>
              </button>
            ) : (
              <button 
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <span className={styles.submitArrow}>✓</span>
                  </>
                )}
              </button>
            )}
          </div>

          <p className={styles.formDisclaimer}>
            <span className={styles.disclaimerIcon}>🔒</span>
            <span>Your information is secure and will only be used to provide you with a custom quote. We respect your privacy.</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default GetQuote;
