import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContactModal } from '../context/ContactModalContext';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ContactPage = () => {
  const { openModal } = useContactModal();
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const depts = [
    { num: '01', title: 'DISPATCH PROTOCOL', type: 'dispatch', desc: 'Active load tracking, routing adjustments, and driver communication. 24/7 support.', email: 'ops@punjab.com' },
    { num: '02', title: 'GENERAL INQUIRIES', type: 'general', desc: 'Corporate communication, partnership requests, and enterprise quotes.', email: 'info@punjab.com' },
    { num: '03', title: 'BILLING & ACCOUNTS', type: 'billing', desc: 'Invoicing, carrier payments, and account setup inquiries. Mon–Fri, 8AM – 5PM PST', email: 'billing@punjab.com' }
  ];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>

        {/* Parallax Header with Image */}
        <section style={{ height: '75vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
          <motion.div style={{ position: 'absolute', top: '-50px', left: '-50px', right: '-50px', bottom: '-50px', y: headerY }}>
            <img src="/Red Komodo Drone shot warehouse.png" alt="Operations" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3) saturate(0.6) contrast(1.1) brightness(0.4)' }} />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 80%)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 4vw 6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '8px', height: '8px', background: '#555', borderRadius: '50%' }} className="pulse-dot" />
              <span className="label-text" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                OPERATIONS // OPEN 24/7
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(4rem, 9vw, 9rem)',
              fontWeight: 400, lineHeight: 0.9,
              letterSpacing: '-0.05em', color: '#fff',
              margin: 0, maxWidth: '900px',
              textTransform: 'uppercase'
            }}>
              Command<br /><span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>Center.</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '1.5rem',
              fontWeight: 300,
              maxWidth: '600px',
              letterSpacing: '0.02em'
            }}>Dispatch, billing, and partnership inquiries.</p>
          </div>
        </section>

        {/* Global Grid System - Dark Ledger Layout */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {depts.map((dept, i) => (
              <div key={i} style={{
                position: 'relative',
                background: 'transparent',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '6rem 4rem', display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                transition: 'background 0.4s ease'
              }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                <div style={{
                  position: 'absolute', top: '1rem', right: '1.5rem',
                  fontSize: '8rem', fontWeight: 300, color: '#fff', opacity: 0.03,
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none', fontFamily: 'monospace'
                }}>
                  {dept.num}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>SEC-{dept.num}</span>
                  </div>

                  <h3 style={{ fontSize: '1.85rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 300, letterSpacing: '-0.02em' }}>{dept.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '300px' }}>{dept.desc}</p>
                  <p style={{ color: '#fff', fontSize: '0.85rem', fontFamily: 'monospace', opacity: 0.8, marginBottom: '4rem' }}>{dept.email}</p>

                  <div style={{ flex: 1 }} />

                  <button
                    onClick={() => openModal(dept.type)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: 'transparent', color: '#fff', border: 'none',
                      padding: 0, fontWeight: 500, fontSize: '0.85rem',
                      letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'gap 0.3s ease, opacity 0.3s ease', opacity: 0.7
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.gap = '1.25rem'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.gap = '0.75rem'; e.currentTarget.style.opacity = '0.7'; }}
                  >
                    CONTACT {dept.title.split(' ')[0]} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Office Block - Data Terminal Style */}
        <section style={{ padding: 'clamp(6rem, 8vw, 10rem) 0' }}>
          <style>{`
            @media (max-width: 768px) {
              .contact-office-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
              .contact-data-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            }
          `}</style>
          <div className="container" style={{ padding: '0 4vw' }}>
            <div className="contact-office-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '4rem' }}>

              <div>
                <span className="label-text" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', display: 'block' }}>// REGIONAL INFRASTRUCTURE</span>
                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '300px', fontWeight: 300 }}>
                  Central nervous system located in the logistics hub of the west coast.
                </p>
              </div>

              <div className="contact-data-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> ADDRESS</h4>
                  <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: 'monospace', opacity: 0.8, wordBreak: 'break-word' }}>1234 LOGISTICS WAY<br />LOS ANGELES, CA 90021<br />UNITED STATES<br /><br /><span style={{ color: '#555' }}>34.0522° N, 118.2437° W</span></p>
                </div>
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> PHONE</h4>
                  <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: 'monospace', opacity: 0.8 }}>+1 (800) 555-1234<br /><span style={{ color: '#555' }}>MON-FRI, 0600 - 1800 PST</span></p>
                </div>
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> EMAIL</h4>
                  <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.6, fontFamily: 'monospace', opacity: 0.8, wordBreak: 'break-word' }}>ops@punjab.com</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
