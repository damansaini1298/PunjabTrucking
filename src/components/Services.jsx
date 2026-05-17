import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Truck, Shield, Clock, MapPin, Wrench, Users } from 'lucide-react';

const services = [
  { icon: Truck, title: 'Full Truckload (FTL)', description: 'Dedicated capacity for your largest shipments. Exclusive trailer use for maximum security and speed.' },
  { icon: MapPin, title: 'Dedicated Routes', description: 'Consistent, scheduled freight on fixed corridors. Recurring lanes designed around your supply chain.' },
  { icon: Shield, title: 'Heavy Haul & Oversized', description: 'Specialized equipment and permits for loads beyond standard dimensions. Certified operators.' },
  { icon: Clock, title: 'Expedited Freight', description: 'Time-critical shipments demanding urgency. Our most experienced drivers with optimized routing.' },
  { icon: Wrench, title: 'Fleet Maintenance', description: 'Rigorous preventive maintenance on every Kenworth. Zero breakdowns. Zero excuses. Maximum uptime.' },
  { icon: Users, title: 'Owner-Operator Program', description: 'Join our elite network. Premium loads, competitive pay, fuel programs, and infrastructure.' },
];

const ServiceCard = ({ svc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
        padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        borderRadius: '3px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
      }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="aero-glass-dark" style={{ width: '48px', height: '48px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' }}>
          <svc.icon size={22} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.9)' }} />
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 500, letterSpacing: '-0.01em', color: '#fff' }}>{svc.title}</h3>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300 }}>{svc.description}</p>
      </div>
      {/* Subtle hover reveal */}
      <motion.div 
        className="card-glow"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        style={{
          position: 'absolute', inset: 0, 
          background: 'radial-gradient(circle at center, #fff 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1
        }}
      />
    </motion.div>
  );
};

const Services = () => {
  const scrollRef = useRef(null);
  
  return (
    <section ref={scrollRef} style={{ background: '#0a0a0a', padding: 'clamp(6rem, 12vw, 10rem) 0' }}>
      <style>{`
        @media (max-width: 860px) {
          .services-layout { grid-template-columns: 1fr !important; }
          .services-sticky { position: static !important; top: auto !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1100px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="container" style={{ position: 'relative' }}>
        <div className="services-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '5vw', alignItems: 'start' }}>
          
          {/* Sticky Header */}
          <div className="services-sticky" style={{ position: 'sticky', top: '15vh' }}>
            <span className="label-text" style={{ display: 'block', marginBottom: '2rem' }}>
              02 — Services
            </span>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.05, maxWidth: '420px',
              color: '#fff', marginBottom: '2rem'
            }}>End-to-End <br /><em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.65)' }}>Precision.</em></h2>
            <p style={{ 
              fontSize: '1rem', color: 'rgba(255,255,255,0.4)', 
              maxWidth: '340px', lineHeight: 1.6, fontWeight: 300 
            }}>From standard freight to complex heavy-haul, we provide the physical infrastructure your enterprise depends on.</p>
          </div>

          {/* Scrolling Grid */}
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {services.map((svc, i) => (
              <ServiceCard key={i} svc={svc} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
