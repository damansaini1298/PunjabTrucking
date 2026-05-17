import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContactModal } from '../context/ContactModalContext';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { openModal } = useContactModal();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    setScrolled(latest > 60);
    if (latest > 250 && latest > prev && !mobileOpen) setHidden(true);
    else setHidden(false);
  });

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Vision', href: '#vision' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Drivers', href: '/drivers' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();

    // If it's a direct route link -> use navigate
    if (href.startsWith('/') && href.length > 1) {
      if (pathname === href) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(href);
      }
      setMobileOpen(false);
      return;
    }

    // If it's home '/'
    if (href === '/') {
      if (pathname === '/') {
        if (window.lenis) window.lenis.scrollTo('#home');
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      setMobileOpen(false);
      return;
    }

    // If not on homepage and attempting to hash scroll, navigate to home + hash
    if (pathname !== '/') {
      navigate('/' + href);
      setMobileOpen(false);
      return;
    }

    // Standard hash scrolling on Home
    const target = document.querySelector(href);
    if (!target) return;
    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const textIdle = scrolled ? '#888' : 'rgba(255,255,255,0.55)';
  const textActive = scrolled ? '#0a0a0a' : '#fff';

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -70, opacity: 0 } }}
        initial="visible"
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: '1rem', left: 0, right: 0,
          zIndex: 100, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 1.5rem', pointerEvents: 'none',
        }}
      >
        {/* Wordmark */}
        <a href="/" onClick={(e) => handleNavClick(e, '/')} style={{
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none'
        }}>
          <span style={{
            fontWeight: 700, fontSize: '0.92rem', letterSpacing: '-0.03em',
            color: scrolled ? '#0a0a0a' : '#fff', transition: 'color 0.5s ease',
          }}>PUNJAB</span>
          <span style={{
            fontWeight: 300, fontSize: '0.92rem', letterSpacing: '0.01em',
            color: scrolled ? '#999' : 'rgba(255,255,255,0.5)', transition: 'color 0.5s ease',
          }}>TRUCKING</span>
        </a>

        {/* Center pill */}
        <div
          className={`desktop-nav ${scrolled ? 'aero-glass-light' : 'aero-glass-dark'}`}
          onMouseLeave={() => setHovered(null)}
          style={{
            pointerEvents: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '1px',
            borderRadius: '100px',
            padding: '0.25rem 0.3rem',
            transition: 'all 0.5s ease',
            boxShadow: scrolled ? '0 1px 12px -3px rgba(0,0,0,0.06)' : 'none',
          }}
        >
          {links.map((link) => {
            const isHovered = hovered === link.name;
            let isCurrent = false;

            if (link.href === '/') {
              isCurrent = pathname === '/' && (!hash || hash === '#home');
            } else if (link.href.startsWith('/') && link.href.length > 1) {
              isCurrent = pathname === link.href;
            } else {
              isCurrent = pathname === '/' && hash === link.href;
            }

            const active = isHovered || isCurrent;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHovered(link.name)}
                style={{
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.01em',
                  color: active ? textActive : textIdle,
                  padding: '0.45rem 0.9rem', borderRadius: '100px',
                  background: active ? (scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)') : 'transparent',
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                }}
              >{link.name}</a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => openModal('quote')}
          className="desktop-nav"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          style={{
            pointerEvents: 'auto', fontSize: '0.68rem', fontWeight: 700,
            letterSpacing: '0.03em', padding: '0.55rem 1.25rem',
            borderRadius: '100px',
            background: scrolled ? '#0a0a0a' : '#fff',
            color: scrolled ? '#fff' : '#0a0a0a',
            transition: 'all 0.5s ease', whiteSpace: 'nowrap',
          }}
        >Partner With Us</motion.button>

        {/* Mobile toggle */}
        <div className="mobile-toggle" style={{ pointerEvents: 'auto' }}>
          <button
            className={scrolled ? 'aero-glass-light' : 'aero-glass-dark'}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              color: scrolled || mobileOpen ? '#0a0a0a' : '#fff',
              borderRadius: '50%',
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.4s ease',
            }}
          >{mobileOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: 0, background: '#fff',
              zIndex: 90, display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center', gap: '1.75rem',
            }}
          >
            {links.map((item, i) => (
              <motion.a
                key={item.name} href={item.href}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 400,
                  color: '#0a0a0a', letterSpacing: '-0.03em',
                }}
              >{item.name}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) { .desktop-nav { display: none !important; } }
        @media (min-width: 861px) { .mobile-toggle { display: none !important; } }
      `}</style>
    </>
  );
};

export default Navbar;
