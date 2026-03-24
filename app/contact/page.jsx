'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ShimmerButton from '@/components/ui/shimmer-button';
import { useDonate } from '@/app/DonateContext';

export default function ContactPage() {
  const { setShowDonateModal } = useDonate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowDonateModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xlgnvoej', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Contact Form Submission',
            value: 1
          });
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section contact-section-modern" aria-label="Contact us">
        <div className="contact-section-modern-bg" aria-hidden="true" />
        <div className="contact-section-modern-inner">
          <div className="contact-section-modern-left">
            <h2 className="contact-section-title">
              We&apos;d love to hear how you want to bring health education to your community.
            </h2>
            <p className="contact-section-subtitle">
              Share a bit about yourself or your school, and we&apos;ll follow up with next steps, resources, or ways to get involved.
            </p>
            <div className="contact-section-email">
              <span>Fill out the form or mail us at</span>
              <a href="mailto:kartikn@healthdecodedinitiative.org">kartikn@healthdecodedinitiative.org</a>
            </div>
          </div>

          <div className="contact-section-modern-card">
            <h3 className="contact-section-card-title">Send us a message</h3>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <span id="name-error" className="error-message" role="alert">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <span id="email-error" className="error-message" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                  aria-invalid={!!formErrors.subject}
                  aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                />
                {formErrors.subject && (
                  <span id="subject-error" className="error-message" role="alert">
                    {formErrors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={formErrors.message ? 'error' : ''}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                />
                {formErrors.message && (
                  <span id="message-error" className="error-message" role="alert">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="form-success" role="alert">
                  <p>Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-error" role="alert">
                  <p>Sorry, there was an error sending your message. Please try again or email us directly at <a href="mailto:kartikn@healthdecodedinitiative.org">kartikn@healthdecodedinitiative.org</a>.</p>
                </div>
              )}

              <ShimmerButton
                type="submit"
                className="contact-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </ShimmerButton>
            </form>
          </div>
        </div>
      </section>

      <section
        className="section donate-section"
        aria-label="Support our mission"
      >
        <div className="donate-content">
          <motion.div
            className="donate-growth-images"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            aria-label="Illustration of how your support helps Health Decoded grow"
          >
            {[
              "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=600&q=80",
              "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80",
              "https://images.unsplash.com/photo-1514996937319-344454492b37?w=600&q=80",
            ].map((src, index) => (
              <motion.div
                key={index}
                className="donate-growth-image-wrapper"
                variants={{
                  hidden: { y: 24, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
              >
                <img
                  src={src}
                  alt={`Health education impact scene ${index + 1}`}
                  className="donate-growth-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1514996937319-344454492b37?w=600&q=80";
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            className="donate-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Support Our Mission
          </motion.h2>

          <motion.div
            className="donate-growth-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p>
              Your support helps us bring health education to youth across
              communities. Donations enable us to:
            </p>
            <ul className="donate-list">
              <li>Develop and deliver school workshops</li>
              <li>Train peer health ambassadors</li>
              <li>Create educational resources</li>
              <li>Expand our reach to underserved communities</li>
            </ul>
          </motion.div>

          <motion.div
            className="donate-button-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ShimmerButton
              className="donate-button"
              onClick={handleDonateClick}
            >
              Get notified when donating opens
            </ShimmerButton>
            <p className="donate-note">
              Our donations page is coming soon. In the meantime, you can still
              reach out to partner or collaborate with us.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
