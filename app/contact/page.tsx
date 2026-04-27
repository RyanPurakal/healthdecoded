// Contact page: client-side form with inline validation that POSTs to Formspree (endpoint xlgnvoej); shows animated success/error states using Framer Motion.
'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Send, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

type FormField = 'name' | 'email' | 'subject' | 'message';

type FormErrors = Partial<Record<FormField, string>>;

const fieldClass = (hasError: boolean) =>
  [
    'contact-field w-full p-3.5 rounded-xl border bg-beige text-base text-black placeholder:text-slate-400',
    'transition-[border-color,box-shadow] duration-200 ease-out',
    hasError
      ? 'border-red-300 focus-visible:border-red-400 focus-visible:shadow-[0_0_0_3px_rgba(248,113,113,0.25)]'
      : 'border-slate-200 focus-visible:border-[#4F62F8] focus-visible:shadow-[0_0_0_4px_rgba(79,98,248,0.18)]',
    'focus-visible:outline-none',
  ].join(' ');

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
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xlgnvoej', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige py-10 sm:py-14 md:py-20 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="grid md:grid-cols-2 gap-0 md:gap-0 md:items-stretch bg-beige-light rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-beige-dark">

          <div className="p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-beige to-beige-light relative border-b md:border-b-0 md:border-r border-beige-dark/80">
            <div className="flex justify-end mb-4 sm:mb-6 md:absolute md:top-0 md:right-0 md:mb-0 md:p-6 lg:p-8">
              <img
                src="/logo192.png"
                alt="Health Decoded Logo"
                className="w-16 h-auto sm:w-24 md:w-28 object-contain"
                loading="eager"
              />
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
              className="min-w-0"
            >
              <p className="team-section-modern-pill mb-4 sm:mb-6">
                <MessageSquare className="team-section-modern-pill-icon" size={16} aria-hidden />
                Contact Us
              </p>
              <h1 className="team-section-modern-title !mt-0 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-words">
                Let&apos;s work <span className="hd-gradient-text">together.</span>
              </h1>
              <p className="text-base sm:text-lg text-black mb-6 sm:mb-8 max-w-md">
                Feel free to contact about any questions or opportunities!
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-black font-medium">
                <div className="h-12 w-12 shrink-0 rounded-full bg-beige-light shadow-sm flex items-center justify-center text-indigo-500">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-black">Prefer direct email?</p>
                  <a
                    href="mailto:kartikn@healthdecodedinitiative.org"
                    className="text-indigo-600 hover:text-indigo-700 transition-colors break-words text-sm sm:text-base"
                  >
                    kartikn@healthdecodedinitiative.org
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-5 sm:p-8 md:p-12 lg:p-16 min-w-0 bg-beige-light/50">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 28 }
                  }
                  className="flex flex-col items-center justify-center h-full text-center py-12 px-2"
                >
                  <motion.div
                    className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"
                    initial={reduce ? false : { scale: 0.5, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 22, delay: 0.08 }
                    }
                  >
                    <CheckCircle2 size={40} aria-hidden />
                  </motion.div>
                  <div className="inline-flex items-center gap-1.5 text-emerald-700 text-sm font-semibold mb-2">
                    <Sparkles size={16} aria-hidden />
                    Sent
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">Message Sent!</h3>
                  <p className="text-black mb-8 max-w-xs mx-auto leading-relaxed">
                    Thanks for reaching out! We&apos;ve received your note and will get back to you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitStatus(null)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-semibold text-black">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={fieldClass(!!formErrors.name)}
                        placeholder="Jane Doe"
                        autoComplete="name"
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500 font-medium">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-semibold text-black">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={fieldClass(!!formErrors.email)}
                        placeholder="jane@example.com"
                        autoComplete="email"
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500 font-medium">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-sm font-semibold text-black">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={fieldClass(!!formErrors.subject)}
                      placeholder="Partnership inquiry"
                    />
                    {formErrors.subject && (
                      <p className="text-xs text-red-500 font-medium">{formErrors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-semibold text-black">
                      How can we help?
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${fieldClass(!!formErrors.message)} resize-none min-h-[140px]`}
                      placeholder="Tell us what's on your mind..."
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-500 font-medium">{formErrors.message}</p>
                    )}
                  </div>

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100"
                      role="alert"
                    >
                      Sorry, there was an error sending your message. Please try again later.
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-base py-6 rounded-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} aria-hidden />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
