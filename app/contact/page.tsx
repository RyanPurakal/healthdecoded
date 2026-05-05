// Contact page: two-panel structural layout (dark | white) wrapping
// the existing Formspree form with inline validation and Framer Motion states.
'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';

type FormField = 'name' | 'email' | 'subject' | 'message';
type FormErrors = Partial<Record<FormField, string>>;

/* ── Styles are all in site-theme.css under .ct-* ── */

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const reduce = useReducedMotion();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as FormField;
    setFormData(prev => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('https://formspree.io/f/xlgnvoej', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _replyto: formData.email }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      } else throw new Error('Submission failed');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ct-page">
      <div className="ct-card">

        {/* ── Left panel — dark ────────────────────────────── */}
        <div className="ct-panel-dark">
          <img
            src="/logo192.png"
            alt="Health Decoded"
            className="ct-logo"
            loading="eager"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45 }}
          >
            <p className="ct-eyebrow">Contact Us</p>
            <h1 className="ct-heading">
              Let&apos;s work<br />
              <span className="ct-heading-accent">together.</span>
            </h1>
            <p className="ct-lead">
              Feel free to reach out about any questions or opportunities!
            </p>

            <div className="ct-email-row">
              <div className="ct-email-icon">
                <Mail size={18} aria-hidden />
              </div>
              <div>
                <p className="ct-email-label">Prefer direct email?</p>
                <a
                  href="mailto:kartikn@healthdecodedinitiative.org"
                  className="ct-email-link"
                >
                  kartikn@healthdecodedinitiative.org
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Right panel — form ───────────────────────────── */}
        <div className="ct-panel-form">
          <AnimatePresence mode="wait">

            {/* Success state */}
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 28 }}
                className="ct-success"
              >
                <motion.div
                  className="ct-success-icon"
                  initial={reduce ? false : { scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 22, delay: 0.08 }}
                >
                  <CheckCircle2 size={36} aria-hidden />
                </motion.div>
                <p className="ct-success-label">Sent</p>
                <h3 className="ct-success-title">Message Sent!</h3>
                <p className="ct-success-body">
                  Thanks for reaching out. We&apos;ve received your note and will get back to you shortly.
                </p>
                <button className="ct-btn ct-btn-outline" onClick={() => setSubmitStatus(null)}>
                  Send another message
                </button>
              </motion.div>

            ) : (

              /* Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ct-form"
                noValidate
              >
                <div className="ct-row-two">
                  <div className="ct-field-group">
                    <label htmlFor="ct-name" className="ct-label">Name</label>
                    <input
                      id="ct-name" type="text" name="name"
                      value={formData.name} onChange={handleChange}
                      className={`ct-input${formErrors.name ? ' ct-input-error' : ''}`}
                      placeholder="Jane Doe" autoComplete="name"
                    />
                    {formErrors.name && <p className="ct-error">{formErrors.name}</p>}
                  </div>
                  <div className="ct-field-group">
                    <label htmlFor="ct-email" className="ct-label">Email</label>
                    <input
                      id="ct-email" type="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className={`ct-input${formErrors.email ? ' ct-input-error' : ''}`}
                      placeholder="jane@example.com" autoComplete="email"
                    />
                    {formErrors.email && <p className="ct-error">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="ct-field-group">
                  <label htmlFor="ct-subject" className="ct-label">Subject</label>
                  <input
                    id="ct-subject" type="text" name="subject"
                    value={formData.subject} onChange={handleChange}
                    className={`ct-input${formErrors.subject ? ' ct-input-error' : ''}`}
                    placeholder="Partnership inquiry"
                  />
                  {formErrors.subject && <p className="ct-error">{formErrors.subject}</p>}
                </div>

                <div className="ct-field-group">
                  <label htmlFor="ct-message" className="ct-label">How can we help?</label>
                  <textarea
                    id="ct-message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows={5}
                    className={`ct-input ct-textarea${formErrors.message ? ' ct-input-error' : ''}`}
                    placeholder="Tell us what's on your mind..."
                  />
                  {formErrors.message && <p className="ct-error">{formErrors.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ct-error-banner"
                    role="alert"
                  >
                    Sorry, there was an error sending your message. Please try again later.
                  </motion.div>
                )}

                <button type="submit" disabled={isSubmitting} className="ct-btn ct-btn-filled">
                  {isSubmitting ? (
                    <><Loader2 className="ct-spin" size={18} aria-hidden /> Sending…</>
                  ) : (
                    <><Send size={16} aria-hidden /> Send Message</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
