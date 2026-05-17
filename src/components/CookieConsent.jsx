import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_KEY = 'pt_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay if no consent stored
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99990,
            background: 'rgba(8, 8, 8, 0.96)',
            backdropFilter: 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: 'clamp(1.25rem, 3vw, 1.75rem) 4vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            {/* Left: text */}
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <span style={{
                display: 'block',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '0.5rem',
              }}>
                Cookie Notice
              </span>
              <p style={{
                fontSize: 'clamp(0.82rem, 1.5vw, 0.92rem)',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 300,
              }}>
                We use cookies to keep the site functional and to understand how it's used.
                No personal data is sold. See our{' '}
                <a
                  href="#"
                  style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  onClick={(e) => e.preventDefault()}
                >
                  privacy policy
                </a>{' '}
                for details.
              </p>
            </div>

            {/* Right: buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
              <button
                onClick={decline}
                style={{
                  padding: '0.65rem 1.4rem',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                style={{
                  padding: '0.65rem 1.75rem',
                  background: '#fff',
                  border: '1px solid #fff',
                  color: '#0a0a0a',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
