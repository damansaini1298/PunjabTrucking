import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactModal } from '../context/ContactModalContext';
import { X, CheckCircle2, Loader2 } from 'lucide-react';

const ContactModal = () => {
  const { isOpen, closeModal, formType } = useContactModal();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const formRef = useRef(null);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };


  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSending(false);
      setEmailError('');
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  const getTitle = () => {
    switch (formType) {
      case 'quote': return 'Request a Quote';
      case 'dispatch': return 'Dispatch Operations';
      case 'billing': return 'Billing Inquiry';
      case 'support': return 'Technical Support';
      default: return 'Contact Us';
    }
  };

  const showCompany = ['quote', 'dispatch'].includes(formType);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get('email');
    const honey = formData.get('_honey');

    // Honeypot anti-spam check
    if (honey && honey.trim() !== '') {
      // Bot detected - silently discard
      setSubmitted(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setSending(true);

    try {
      // Simulate network request delay for local submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'auto' }}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 'min(100vw, 600px)',
              background: 'rgba(12,12,12,0.95)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-20px 0 50px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Secure Transmission
                </span>
                <h3 style={{ margin: 0, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.02em' }}>
                  {getTitle()}
                </h3>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff', transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              /* Post-Submit Confirmation */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', padding: 'clamp(2rem, 4vw, 3rem)', gap: '1.5rem'
                }}
              >
                <CheckCircle2 size={48} color="#fff" strokeWidth={1} />
                <h3 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 300, letterSpacing: '0.03em', textTransform: 'uppercase', margin: 0 }}>
                  Message Received
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '350px', fontSize: '0.95rem' }}>
                  Application received. We'll be in touch within 48 hours.
                </p>
                <button
                  onClick={closeModal}
                  style={{
                    marginTop: '1rem', padding: '0.85rem 2rem', background: '#fff', color: '#0a0a0a',
                    border: 'none', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
                  onMouseLeave={e => e.currentTarget.style.opacity = 1}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <>
                {/* Form Body */}
                <form ref={formRef} onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* HONEYPOT: Hidden anti-spam field */}
                  <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                  <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={labelStyle}>Name</label>
                        <input name="name" type="text" required style={inputStyle} placeholder="John Doe" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={labelStyle}>Phone</label>
                        <input name="phone" type="tel" value={phoneVal} onChange={(e) => setPhoneVal(formatPhoneNumber(e.target.value))} required style={inputStyle} placeholder="(555) 000-0000" />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={labelStyle}>Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        style={{
                          ...inputStyle,
                          borderColor: emailError ? 'rgba(220,50,50,0.6)' : 'rgba(255,255,255,0.1)'
                        }}
                        placeholder="john@example.com"
                        onChange={() => emailError && setEmailError('')}
                      />
                      {emailError && (
                        <span style={{ fontSize: '0.72rem', color: '#e05555', marginTop: '0.25rem' }}>{emailError}</span>
                      )}
                    </div>

                    {showCompany && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={labelStyle}>Company</label>
                        <input name="company" type="text" style={inputStyle} placeholder="Your Enterprise LLC" />
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                      <label style={labelStyle}>Message Details</label>
                      <textarea name="message" required style={{ ...inputStyle, flex: 1, resize: 'none', minHeight: '120px' }} placeholder="How can we help?" />
                    </div>
                  </div>

                  {/* Footer / Submit */}
                  <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                    <button type="submit" disabled={sending} style={{
                      width: '100%', padding: '1rem', background: sending ? '#666' : '#fff', color: sending ? '#fff' : '#0a0a0a',
                      border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600,
                      letterSpacing: '0.05em', textTransform: 'uppercase', cursor: sending ? 'wait' : 'pointer',
                      transition: 'opacity 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }} onMouseEnter={e => !sending && (e.currentTarget.style.opacity = 0.9)} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                      {sending ? <><Loader2 size={16} className="spin" /> Sending...</> : 'Submit'}
                    </button>
                  </div>
                </form>
              </>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const labelStyle = {
  fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
  fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em'
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border 0.2s ease, background 0.2s ease',
  boxSizing: 'border-box'
};

export default ContactModal;
