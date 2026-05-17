import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GalleryImage = ({ src, alt, height, parallax = false }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: parallax ? '116%' : '100%',
          objectFit: 'cover',
          display: 'block',
          position: parallax ? 'absolute' : 'relative',
          top: parallax ? '-8%' : 0,
          y: parallax ? y : undefined,
          filter: 'saturate(0.95) contrast(1.05)',
          transition: 'filter 0.4s ease',
        }}
        onMouseEnter={(e) => (e.target.style.filter = 'saturate(1.1) contrast(1.1)')}
        onMouseLeave={(e) => (e.target.style.filter = 'saturate(0.95) contrast(1.05)')}
      />
    </motion.div>
  );
};

const Gallery = () => (
  <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(6rem, 10vw, 10rem) 0' }}>
    <div className="container">
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <span className="label-text" style={{ display: 'block', marginBottom: '2rem' }}>
            04 — Portfolio
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: '600px',
          }}>
            Red Komodo Drone View.
          </h2>
        </div>
        <p style={{ maxWidth: '340px', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingBottom: '0.5rem' }}>
          Aerial reconnaissance of our massive fleet in action. Precision captured from the skies using cinema-grade RED cameras.
        </p>
      </div>

      {/* Row 1 - Hero */}
      <div style={{ marginBottom: '1rem' }}>
        <GalleryImage src="/Red Komodo Drone shot.png" alt="Fleet Aerial" height="clamp(40vh, 60vw, 70vh)" parallax />
      </div>

      {/* Row 2 - 50/50 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <GalleryImage src="/Red Komodo Drone shot2.1.png" alt="Drone View 2" height="clamp(30vh, 40vw, 45vh)" />
        <GalleryImage src="/Red Komodo Drone shot3.png" alt="Drone View 3" height="clamp(30vh, 40vw, 45vh)" parallax />
      </div>

      {/* Row 3 - Large Single with padding */}
      <div style={{ padding: '4rem 10%', marginBottom: '1rem' }}>
        <GalleryImage src="/Red Komodo Drone shot4.png" alt="Drone View 4" height="clamp(40vh, 55vw, 60vh)" parallax />
      </div>

      {/* Row 4 - 60/40 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <GalleryImage src="/Red Komodo Drone shot5.png" alt="Drone View 5" height="clamp(30vh, 40vw, 50vh)" parallax />
        <GalleryImage src="/Red Komodo Drone shot6.png" alt="Drone View 6" height="clamp(30vh, 40vw, 50vh)" />
      </div>

      {/* Row 5 - Final Hero */}
      <div>
        <GalleryImage src="/Red Komodo Drone shot7.png" alt="Drone View 7" height="clamp(45vh, 60vw, 65vh)" parallax />
      </div>
    </div>
  </section>
);

export default Gallery;
