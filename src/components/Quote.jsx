import React from 'react';
import { motion } from 'framer-motion';

const Quote = () => {
  return (
    <section style={{ background: 'var(--bg-primary)', padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
      <style>{`
        @media (max-width: 768px) {
          .quote-grid { grid-template-columns: 1fr !important; }
          .quote-img-wrap { height: clamp(220px, 50vw, 350px) !important; }
          .quote-text h2 { font-size: clamp(1.6rem, 6vw, 2.4rem) !important; margin-bottom: 2rem !important; }
        }
      `}</style>
      <div className="container">

        <div className="quote-grid" style={{
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: 'clamp(3rem, 8vw, 7rem) 0',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.1fr) 2fr',
          gap: 'clamp(2rem, 6vw, 6rem)',
          alignItems: 'center'
        }}>

          <motion.div
            className="quote-img-wrap"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', height: 'clamp(350px, 50vh, 600px)', borderRadius: '4px', overflow: 'hidden' }}
          >
            <img
              src="img_coast2.png"
              alt="Coastal Highway"
              style={{ objectFit: 'cover', objectPosition: '72% center', width: '100%', height: '100%', filter: 'grayscale(0.6) contrast(1.1) saturate(0.5)' }}
            />
          </motion.div>

          <div className="quote-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-text" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                Company Manifesto
              </span>
              <h2 style={{
                fontSize: 'clamp(2rem, 3.8vw, 4.2rem)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '4rem',
                maxWidth: '900px'
              }}>
                We don't just move freight.<br />
                We move the backbone of the economy.<br />
                <span style={{ color: 'rgba(0,0,0,0.38)' }}>
                  Every load we haul, every mile we drive, carries the weight of someone's livelihood.
                </span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Focus</span>
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>Absolute Reliability</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scope</span>
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>North America</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Command</span>
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>Punjab Leadership</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Quote;
