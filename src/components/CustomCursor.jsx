import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      height: 20,
      width: 20,
      backgroundColor: 'rgba(17, 24, 39, 0.4)',
      border: '1px solid rgba(17, 24, 39, 0.8)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.1,
      }
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(17, 24, 39, 0.1)',
      border: '1px solid rgba(17, 24, 39, 0.3)',
      backdropFilter: 'blur(4px)',
      transition: {
        type: 'tween',
        ease: 'backOut',
        duration: 0.2,
      }
    }
  };

  return (
    <motion.div
      className="cursor"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isHovering && <div style={{ height: 4, width: 4, borderRadius: '50%', backgroundColor: '#111827' }} />}
    </motion.div>
  );
};

export default CustomCursor;
