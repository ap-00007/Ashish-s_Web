'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleGlitchProps {
  className?: string;
}

export function RoleGlitch({ className = '' }: RoleGlitchProps) {
  const roles = ['Software Developer', 'Data Scientist'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      // Start glitch effect
      setIsGlitching(true);
      
      // After glitch animation, change the role
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsGlitching(false);
      }, 400); // Glitch duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [roles.length, isMounted]);

  const glitchVariants = {
    normal: {
      x: 0,
      textShadow: 'none',
      filter: 'none',
    },
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      textShadow: [
        'none',
        '2px 0 #ff0000, -2px 0 #00ffff',
        '-2px 0 #ff0000, 2px 0 #00ffff',
        '1px 0 #ff0000, -1px 0 #00ffff',
        'none'
      ],
      filter: [
        'none',
        'hue-rotate(90deg)',
        'hue-rotate(180deg)',
        'hue-rotate(270deg)',
        'none'
      ],
      transition: {
        duration: 0.4,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: [0.25, 0.1, 0.25, 1] as any,
      },
    },
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={`inline-block ${className}`}>
      {!isMounted ? (
        <span className="inline-block">{roles[0]}</span>
      ) : (
        <AnimatePresence mode="wait">
          <motion.span
            key={currentRoleIndex}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <motion.span
              variants={glitchVariants}
              animate={isGlitching ? 'glitch' : 'normal'}
              className="inline-block"
              style={{
                textShadow: isGlitching ? '2px 0 #ff0000, -2px 0 #00ffff' : 'none',
              }}
            >
              {roles[currentRoleIndex]}
            </motion.span>
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
}
