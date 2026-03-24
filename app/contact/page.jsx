'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, subject: formData.subject, message: formData.message, _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige py-8 sm:py-12 md:py-16 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="grid md:grid-cols-2 gap-0 md:gap-0 md:items-stretch bg-beige-light rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-beige-dark">
          
          {/* Left Side Info */}
          <div className="p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-beige to-beige-light relative border-b md:border-b-0 md:border-r border-beige-dark/80">
            <div className="flex justify-end mb-4 sm:mb-6 md:absolute md:top-0 md:right-0 md:mb-0 md:p-6 lg:p-8">
              <img src="/logo192.png" alt="Health Decoded Logo" className="w-16 h-auto sm:w-24 md:w-28 object-contain" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="min-w-0">
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <MessageSquare size={16} className="shrink-0" /> Contact Us
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight break-words">
                Let&apos;s work together.
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
                  <a href="mailto:kartikn@healthdecodedinitiative.org" className="text-indigo-600 hover:text-indigo-700 transition-colors break-words text-sm sm:text-base">kartikn@healthdecodedinitiative.org</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side Form */}
          <div className="p-5 sm:p-8 md:p-12 lg:p-16 min-w-0">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">Message Sent!</h3>
                  <p className="text-black mb-8 max-w-xs mx-auto">Thanks for reaching out! We&apos;ve received your note and will get back to you shortly.</p>
                  <Button variant="outline" onClick={() => setSubmitStatus(null)}>Send another message</Button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-black">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full p-3 rounded-xl border ${formErrors.name ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'} transition-all outline-none bg-beige group-hover:bg-beige-light`} placeholder="Jane Doe" />
                      {formErrors.name && <p className="text-xs text-red-500 font-medium">{formErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-black">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-3 rounded-xl border ${formErrors.email ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'} transition-all outline-none bg-beige`} placeholder="jane@example.com" />
                      {formErrors.email && <p className="text-xs text-red-500 font-medium">{formErrors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={`w-full p-3 rounded-xl border ${formErrors.subject ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'} transition-all outline-none bg-beige`} placeholder="Partnership inquiry" />
                    {formErrors.subject && <p className="text-xs text-red-500 font-medium">{formErrors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black">How can we help?</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full p-3 rounded-xl border ${formErrors.message ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50'} transition-all outline-none bg-beige resize-none`} placeholder="Tell us what's on your mind..."></textarea>
                    {formErrors.message && <p className="text-xs text-red-500 font-medium">{formErrors.message}</p>}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium">Sorry, there was an error sending your message. Please try again later.</div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full text-base py-6 rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <><Send size={18} /> Send Message</>}
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
