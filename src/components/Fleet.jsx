import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Fleet = () => {
  const ref = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrubIndex, setScrubIndex] = useState(0);

  // Measure when the section is moving through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.35", "end 0.4"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setScrubIndex(0);
    else if (latest >= 0.25 && latest < 0.5) setScrubIndex(1);
    else if (latest >= 0.5 && latest < 0.75) setScrubIndex(2);
    else if (latest >= 0.75) setScrubIndex(3);
  });

  const capabilities = [
    { id: '01', title: 'Monolithic Assets', desc: 'Top-tier Kenworth trucks engineered for peak performance, maximum efficiency, and unprecedented heavy-haul capability. A massive fleet designed for scale.', img: '/img2.png' },
    { id: '02', title: 'Human Operations', desc: 'An elite roster of seasoned drivers. We invest heavily in human capital ensuring every route is executed with unmatched professionalism and tactical precision.', img: '/img_driver1.png' },
    { id: '03', title: 'Precise Execution', desc: 'Seamless logistical tracking and master-level dispatching. A fully transparent framework that ensures your high-value freight arrives precisely on schedule.', img: '/tech_macro.png' },
    { id: '04', title: <>Safety<br />Culture</>, desc: 'Zero-incident operations. We exceed DOT compliance with rigorous internal safety standards, continuous specialized training, and no-compromise protocols.', img: '/img4.png' },
  ];

  return (
    <section ref={ref} id="fleet" style={{ background: 'var(--bg-primary)', padding: 'clamp(8rem, 12vw, 10rem) 0' }}>
      <div className="container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span className="label-text" style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              03 — Infrastructure
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 }}>
              Operational Grid
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          borderTop: '1px solid var(--border-color)',
          borderLeft: '1px solid var(--border-color)'
        }}>
          {capabilities.map((cap, i) => {
            const isActive = hoveredIndex !== null ? hoveredIndex === i : scrubIndex === i;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  height: 'clamp(400px, 50vh, 550px)',
                  borderRight: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  // Always show a faint ghost texture in the background
                  backgroundImage: `url(${cap.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'var(--bg-primary)',
                }}
              >
                {/* White overlay: opaque when inactive (shows ghost), transparent when active */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 0.92 }}
                  transition={{ duration: 0.4 }}
                  style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'var(--bg-primary)', pointerEvents: 'none' }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>
                    {cap.id}
                  </span>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 2vw, 2.2rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    marginBottom: '1rem',
                    color: isActive ? '#fff' : 'var(--text-primary)',
                    transition: 'color 0.4s ease'
                  }}>
                    {cap.title}
                  </h3>
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      marginTop: '1rem',
                      padding: '1.25rem',
                      borderRadius: '6px',
                      background: 'rgba(8,8,8,0.54)',
                      backdropFilter: 'blur(28px) saturate(1.4)',
                      WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                      <p style={{
                        fontSize: '0.95rem', lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.88)',
                        margin: 0
                      }}>
                        {cap.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: `url(${cap.img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'grayscale(0.5) contrast(1.1) brightness(0.4)'
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Fleet;
