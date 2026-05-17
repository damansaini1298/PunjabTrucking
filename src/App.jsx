import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactModalProvider } from './context/ContactModalContext';
import ContactModal from './components/ContactModal';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import DriversPage from './pages/DriversPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    lenis.stop();
    const timer = setTimeout(() => {
      setBooted(true);
      lenis.start();
    }, 2400);

    return () => { clearTimeout(timer); lenis.destroy(); };
  }, []);

  return (
    <ContactModalProvider>
      <Router>
        <AnimatePresence>
          {!booted && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', inset: 0,
                backgroundColor: '#0a0a0a',
                zIndex: 9999,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60px' }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '1px', background: 'rgba(255,255,255,0.3)' }}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  color: '#fff', fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.35em', textTransform: 'uppercase',
                }}
              >
                Punjab Trucking
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <ContactModal />
        <CookieConsent />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </ContactModalProvider>
  );
}

export default App;
