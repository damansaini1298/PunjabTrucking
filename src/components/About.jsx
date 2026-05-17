import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Counter = ({ to, suffix = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const passed = timestamp - startTime;

        if (passed < delay) {
          window.requestAnimationFrame(step);
          return;
        }

        const progress = Math.min((passed - delay) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = start + easeProgress * (to - start);

        if (to % 1 !== 0) setVal(current.toFixed(1) + suffix);
        else setVal(Math.round(current) + suffix);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          if (to % 1 !== 0) setVal(to.toFixed(1) + suffix);
          else setVal(to + suffix);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, suffix, delay]);

  return <span ref={ref}>{val}</span>;
};

const About = () => {
  const imgRef = useRef(null);
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(imgProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(imgProgress, [0, 0.5], [0.94, 1]);

  const stats = [
    { value: 99.9, suffix: '%', label: 'On-Time' },
    { value: 24, suffix: '/7', label: 'Live Control' },
    { value: 48, suffix: '', label: 'States' },
    { value: 15, suffix: '+', label: 'Years Exp.' },
  ];

  return (
    <section id="vision" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <style>{`
        /* ── MOBILE ≤ 860px ── */
        @media (max-width: 860px) {
          .mandate-top-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .mandate-stats-grid { padding-left: 0 !important; border-left: none !important; border-top: 1px solid var(--border-color); padding-top: 2rem; }
          .glass-cinematic-wrap { flex-direction: column !important; height: auto !important; overflow: visible !important; }
          .glass-cinematic-img { height: clamp(220px, 60vw, 340px) !important; border-radius: 0 !important; }
          .glass-panel-wrapper {
            position: relative !important;
            bottom: auto !important; left: auto !important;
            transform: none !important;
            width: 100% !important;
            margin-top: 0 !important;
          }
          .glass-panel-inner {
            flex-direction: column !important;
            gap: 1rem !important;
            padding: 1.25rem 4vw !important;
            border-radius: 0 !important;
            background: rgba(8, 8, 8, 0.95) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            border-top: 2px solid rgba(255,255,255,0.2) !important;
          }
          /* paragraph must not flex-grow on mobile (would push cards down) */
          .glass-panel-inner > p { flex: 0 0 auto !important; }
          /* 3-col single row on mobile */
          .glass-kpi-row {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
            flex: 0 0 auto !important;
          }
          .glass-kpi-item {
            height: auto !important;
            padding: 0.75rem 0.65rem !important;
            border-radius: 0 !important;
          }
          /* prevent panel from being taller than its content */
          .glass-panel-inner { padding-bottom: 1.25rem !important; }
        }
        /* ── TABLET 861–1100px ── */
        @media (min-width: 861px) and (max-width: 1100px) {
          .glass-panel-wrapper { width: 90% !important; }
          .glass-panel-inner {
            gap: 1.75rem !important;
            flex-wrap: wrap !important;
            padding: 2rem 2.5rem !important;
            border-radius: 0 !important;
          }
          /* 3-col grid, auto height */
          .glass-kpi-row {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
          .glass-kpi-item {
            height: auto !important;
            align-self: start !important;
            border-radius: 0 !important;
            padding: 1rem !important;
          }
        }
      `}</style>

      {/* Asymmetrical Top Half */}
      <div className="container" style={{ paddingTop: 'clamp(6rem, 12vw, 10rem)', paddingBottom: 'clamp(6rem, 12vw, 10rem)' }}>
        <div className="mandate-top-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr', gap: '8vw', alignItems: 'start' }}>

          {/* Left: Giant Typography */}
          <div>
            <span className="label-text" style={{ display: 'block', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              01 — Our Mandate
            </span>
            <h2 style={{
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase'
            }}>
              Engineering<br />The Absolute<br /><span style={{ fontStyle: 'italic', color: 'var(--text-secondary)', opacity: 0.8 }}>Standard.</span>
            </h2>
          </div>

          {/* Right: 2x2 Stats Grid */}
          <div className="mandate-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem 2rem',
            marginTop: '1.5rem',
            paddingLeft: '2rem',
            borderLeft: '1px solid var(--border-color)'
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <span style={{
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 300, letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                  display: 'block', lineHeight: 1, marginBottom: '0.8rem',
                }}>
                  <Counter to={stat.value} suffix={stat.suffix} delay={i * 100} />
                </span>
                <span className="label-text" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Cinematic Full-Bleed Image + Glass Panel (stacks on mobile) */}
      <div className="glass-cinematic-wrap" style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>

        {/* Image */}
        <motion.div
          ref={imgRef}
          className="glass-cinematic-img"
          style={{
            width: '100%', height: 'clamp(55vh, 75vw, 82vh)',
            overflow: 'hidden', position: 'relative', scale: imgScale, flexShrink: 0,
          }}
        >
          <motion.img
            src="img_city7.png"
            alt="Cinematic Fleet"
            style={{
              width: '100%', height: '120%', objectFit: 'cover',
              position: 'absolute', top: '-10%', y: imgY,
              filter: 'saturate(0.85) contrast(1.1) brightness(0.88)',
            }}
          />
          {/* Subtle bottom fade to ease the glass transition on desktop */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(6,6,6,0.55) 100%)',
            pointerEvents: 'none'
          }} />
        </motion.div>

        {/* Glass Panel — absolute on desktop, inline on mobile */}
        <div className="glass-panel-wrapper" style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88%',
          zIndex: 10,
        }}>
          <motion.div
            className="glass-panel-inner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(8, 8, 8, 0.58)',
              backdropFilter: 'blur(28px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{
              flex: '1 1 260px',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 300,
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Through a brutal commitment to physical infrastructure and uncompromising human precision, Punjab Trucking guarantees performance at scale across all North American corridors.
            </p>

            <div className="glass-kpi-row" style={{ display: 'flex', gap: '1.5rem', flex: '2 1 420px' }}>
              {[
                ['Scale', 'Continental Corridors'],
                ['Asset Class', 'Tier-1 Fleet'],
                ['Operations', 'Human/Tech Hybrid'],
              ].map(([label, value]) => (
                <motion.div
                  key={label}
                  className="glass-kpi-item"
                  whileHover={{ y: -3 }}
                  style={{
                    flex: '1 1 130px',
                    padding: '1.25rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'default',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <span className="label-text" style={{ display: 'block', marginBottom: '0.6rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>{label}</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
