import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 220]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 900], [1, 1.08]);

  return (
    <section id="home" style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      backgroundColor: '#111',
      overflow: 'hidden',
    }}>
      <style>{`
        .hero-img { object-position: 65% 55%; }
        @media (max-width: 768px) {
          .hero-img { object-position: 60% 50% !important; }
        }
      `}</style>
      {/* Parallax image */}
      <motion.div style={{
        position: 'absolute',
        top: '-6%', left: '-3%', right: '-3%', bottom: '-6%',
        y, scale,
      }}>
        <motion.img
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          src="/hero_section3-2.png"
          alt="Punjab Trucking Kenworth on highway"
          className="hero-img"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.88) contrast(1.06) saturate(1.08)',
          }}
        />
        {/* Subtle bottom-left gradient only for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 22%, transparent 48%)',
        }} />
        {/* Very faint top bar for nav readability */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 100%)',
        }} />
      </motion.div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 4vw 7vh',
      }}>
        <motion.div style={{ opacity }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
          >
            <div style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.45)' }} />
            <span style={{
              color: 'rgba(255,255,255,0.55)', fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>Premium Freight · Est. 2025</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              fontWeight: 400, lineHeight: 0.95,
              letterSpacing: '-0.045em', color: '#fff',
              margin: '0 0 2rem 0', maxWidth: '750px',
            }}
          >
            Movement,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.65)' }}>Refined.</em>
          </motion.h1>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap',
            }}
          >
            <p style={{
              color: 'rgba(255,255,255,0.45)', fontSize: '0.92rem',
              fontWeight: 300, lineHeight: 1.6, maxWidth: '380px',
            }}>
              Engineered reliability meets human expertise. Operating a premium Kenworth fleet for precision freight across North America.
            </p>
            <motion.a
              href="#vision"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="hero-scroll-indicator"
              style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
              Scroll
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
