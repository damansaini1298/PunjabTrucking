import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

const footerLinks = {
  Company: ['About Us', 'Leadership', 'Careers', 'Press'],
  Services: ['Full Truckload', 'Heavy Haul', 'Expedited', 'Dedicated Routes'],
  Drivers: ['Apply Now', 'Owner-Operator', 'Benefits', 'Safety Training'],
  Contact: ['General Inquiries', 'Dispatch', 'Billing', 'Support'],
};

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const footerY = useTransform(scrollYProgress, [0.9, 1], [60, 0]);
  const { openModal } = useContactModal();

  return (
    <>
      {/* CTA */}
      <section id="contact" style={{ background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            borderTop: '1px solid var(--border-color)',
            padding: 'clamp(4rem, 10vw, 8rem) 0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <span className="label-text" style={{ marginBottom: '1.75rem' }}>05 — Partnership</span>
              <h2 style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
                fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: '1.25rem',
              }}>Built for Scale.</h2>
              <p style={{
                fontSize: '0.98rem', color: 'var(--text-secondary)',
                maxWidth: '420px', lineHeight: 1.55, marginBottom: '2.5rem', fontWeight: 300,
              }}>Tell us your lanes. We'll build the route.</p>
              <motion.button
                onClick={() => openModal('quote')}
                whileHover={{ scale: 1.03, boxShadow: '0 14px 35px -10px rgba(0,0,0,0.18)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  border: 'none', cursor: 'pointer',
                  background: '#0a0a0a', color: '#fff',
                  padding: '0.95rem 2.2rem', borderRadius: '100px',
                  fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.01em',
                  boxShadow: '0 6px 20px -6px rgba(0,0,0,0.12)',
                }}
              >Get a Quote <ArrowUpRight size={14} strokeWidth={2} /></motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', overflow: 'hidden', borderTop: '1px solid var(--border-color)' }}>
        <style>{`
          @media (max-width: 860px) {
            .footer-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 500px) {
            .footer-grid { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 861px) {
            .footer-punjab { 
              font-size: clamp(7rem, 24vw, 9999px) !important;
              line-height: 0.72 !important;
            }
          }
        `}</style>
        <div className="container" style={{ padding: 'clamp(3rem, 5vw, 4.5rem) 4vw 1.5rem' }}>
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr repeat(4, 1fr)',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)',
          }}>
            {/* Brand */}
            <div>
              <span style={{ display: 'block', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.03em', marginBottom: '0.85rem' }}>
                Punjab Trucking
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '260px', fontWeight: 300 }}>
                Premium freight infrastructure serving North American corridors — built on Kenworth iron and uncompromising human precision.
              </p>
            </div>
            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, items]) => (
              <div key={category}>
                <span className="label-text" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-primary)' }}>{category}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {items.map((item, idx) => {
                    const linkStyle = { fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' };
                    const hoverOn = e => e.target.style.color = 'var(--text-primary)';
                    const hoverOff = e => e.target.style.color = 'var(--text-secondary)';

                    // Company links → scroll to homepage sections
                    if (category === 'Company') {
                      const sectionMap = { 'About Us': '#vision', 'Leadership': '#vision', 'Careers': '/drivers', 'Press': '#vision' };
                      const target = sectionMap[item] || '#vision';
                      if (target.startsWith('/')) {
                        return <Link key={idx} to={target} style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{item}</Link>;
                      }
                      return (
                        <a key={idx} href={target} style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.location.pathname !== '/') { window.location.href = '/' + target; }
                            else { document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }); }
                          }}
                        >{item}</a>
                      );
                    }

                    // Services links → open quote modal
                    if (category === 'Services') {
                      return <button key={idx} onClick={() => openModal('quote')} style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{item}</button>;
                    }

                    // Drivers links → navigate to /drivers
                    if (category === 'Drivers') {
                      return <Link key={idx} to="/drivers" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{item}</Link>;
                    }

                    // Contact links → open respective modals
                    if (category === 'Contact') {
                      const modalMap = { 'General Inquiries': 'general', 'Dispatch': 'dispatch', 'Billing': 'billing', 'Support': 'support' };
                      return <button key={idx} onClick={() => openModal(modalMap[item] || 'general')} style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{item}</button>;
                    }

                    return <a key={idx} href="#" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>{item}</a>;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem 0',
          }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
              © {new Date().getFullYear()} Punjab Trucking Inc. All rights reserved.
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
              MC# 0000000 · USDOT# 0000000
            </span>
          </div>
        </div>

        {/* PUNJAB watermark — fully intentional per design */}
        <motion.div style={{ y: footerY, pointerEvents: 'none', width: '100%', overflow: 'hidden' }}>
          <h2
            aria-hidden="true"
            className="footer-punjab"
            style={{
              fontSize: 'clamp(3.5rem, 23vw, 22rem)',
              fontWeight: 800, lineHeight: 0.82,
              letterSpacing: '-0.06em',
              color: 'rgba(0,0,0,0.055)',
              textAlign: 'center',
              userSelect: 'none',
              margin: 0,
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >PUNJAB</h2>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
