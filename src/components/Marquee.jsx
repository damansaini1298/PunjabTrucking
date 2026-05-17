import React from 'react';

const items = [
  'Nationwide Coverage',
  'Premium Kenworth Fleet',
  '99.9% On-Time Rate',
  'Real-Time Tracking',
  'Dedicated Dispatch',
  'Heavy Haul Specialists',
  'Owner Operated',
  'Safety First Culture',
  'North American Corridors',
  'DOT Compliant',
];

const Marquee = () => (
  <div style={{
    borderTop: '1px solid var(--border-color)',
    borderBottom: '1px solid var(--border-color)',
    padding: '1rem 0',
    overflow: 'hidden',
    background: 'var(--bg-primary)',
    whiteSpace: 'nowrap',
  }}>
    <div className="marquee-track">
      {[...items, ...items].map((item, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>{item}</span>
          <span style={{
            margin: '0 2rem',
            color: 'var(--text-light)',
            fontSize: '0.35rem',
          }}>●</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
