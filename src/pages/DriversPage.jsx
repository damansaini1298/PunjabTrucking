import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const DriversPage = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [phoneVal, setPhoneVal] = useState('');

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requirements = [
    'Valid Class A Commercial Driver\'s License',
    'Proven track record of safe vehicle operation',
    'Clean MVR & Background Check',
    'Commitment to Safety Excellence & Protocol',
    'Professional Demeanor / High Reliability'
  ];

  const mandate = [
    'Top-tier equipment (Kenworth T680s)',
    'Consistent, dedicated freight corridors',
    'Competitive performance-based compensation',
    'Optimized routing for maximum home time',
    '24/7 Dispatch, Operations & Maintenance Support'
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>

        {/* Full Bleed Parallax Hero */}
        <section style={{ position: 'relative', height: '90vh', overflow: 'hidden', background: '#000' }}>
          <motion.div style={{ position: 'absolute', top: '-50px', left: '-50px', right: '-50px', bottom: '-50px', y: heroY }}>
            <img src="img_driver1.png" alt="Driver Operations" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) contrast(1.1) grayscale(0.5)' }} />
          </motion.div>

          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 60%)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 4vw 6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#e00', borderRadius: '50%' }} className="pulse-dot" />
              <span className="label-text" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                [ DRIVER RECRUITMENT · CLASS A CDL ]
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 400, lineHeight: 0.95,
              letterSpacing: '-0.04em', color: '#fff',
              margin: 0, maxWidth: '900px',
              textTransform: 'uppercase'
            }}>
              Operator<br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>Protocol.</em>
            </h1>
          </div>
        </section>

        {/* Operational Protocol Lists */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

            {/* The Mandate */}
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', position: 'relative', padding: 'clamp(4rem, 8vw, 8rem) 4vw', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: '-5%', fontSize: '24rem', fontWeight: 800, color: '#fff', opacity: 0.02, lineHeight: 0.8, pointerEvents: 'none' }}>01</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '4rem', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase' }}>// The Mandate</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {mandate.map((item, i) => (
                    <div key={i} style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                      <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', paddingTop: '0.25rem', whiteSpace: 'nowrap', flexShrink: 0 }}>M-{i + 1}</span>
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div style={{ position: 'relative', padding: 'clamp(4rem, 8vw, 8rem) 4vw', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: '-5%', fontSize: '24rem', fontWeight: 800, color: '#fff', opacity: 0.02, lineHeight: 0.8, pointerEvents: 'none' }}>02</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '4rem', fontWeight: 400, letterSpacing: '0.05em', textTransform: 'uppercase' }}>// Requirements</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {requirements.map((item, i) => (
                    <div key={i} style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                      <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', paddingTop: '0.25rem', whiteSpace: 'nowrap', flexShrink: 0 }}>R-{i + 1}</span>
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Studio-Grade Application Form */}
        <section style={{ padding: 'clamp(8rem, 10vw, 12rem) 0' }}>
          <div className="container" style={{ padding: '0 4vw', maxWidth: '800px', margin: '0 auto' }}>
            <span className="label-text" style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '1.5rem', fontFamily: 'monospace' }}>[ 03 — INITIATION ]</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '2rem', fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Apply Now.</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '5rem', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6, fontWeight: 300 }}>Our standards are high. Our vetting is thorough. If you meet the mandate, we want to hear from you. We respond within 48 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', marginTop: '2rem' }}
              >
                <CheckCircle2 size={48} color="#fff" strokeWidth={1} />
                <div>
                  <h3 style={{ fontSize: '1.75rem', color: '#fff', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>Transmission Successful</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: '400px' }}>Application received. Our team reviews every submission personally. Expect a call or email within 48 hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;

                // Honeypot anti-spam check
                if (form._honey && form._honey.value.trim() !== '') {
                  setSubmitted(true);
                  return;
                }

                setSending(true);
                try {
                  // Simulate network request delay for local submission
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                } catch (err) { console.error(err); }
                setSending(false);
                setSubmitted(true);
              }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label htmlFor="fullname" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                    <input id="fullname" type="text" placeholder="John Doe" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                    <input id="phone" type="tel" value={phoneVal} onChange={(e) => setPhoneVal(formatPhoneNumber(e.target.value))} placeholder="(555) 000-0000" required style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label htmlFor="email" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                    <input id="email" type="email" placeholder="john@example.com" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label htmlFor="experience" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Experience</label>
                    <input id="experience" type="text" placeholder="5" required style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <label htmlFor="position" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Position</label>
                  <select id="position" required style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="" disabled selected>Select Position...</option>
                    <option value="company" style={{ color: '#000', background: '#fff' }}>Company Driver</option>
                    <option value="owner" style={{ color: '#000', background: '#fff' }}>Owner Operator</option>
                  </select>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button type="submit" disabled={sending} style={{
                    width: '100%', padding: '1.2rem', background: sending ? '#666' : '#fff', color: sending ? '#fff' : '#0a0a0a',
                    border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase', cursor: sending ? 'wait' : 'pointer',
                    transition: 'opacity 0.2s ease', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem'
                  }}
                    onMouseEnter={e => !sending && (e.currentTarget.style.opacity = 0.9)}
                    onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                    {sending ? <><Loader2 size={16} /> Sending...</> : <>Submit Application <ArrowRight size={16} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem 1.25rem',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border 0.2s ease, background 0.2s ease',
  boxSizing: 'border-box'
};

export default DriversPage;
