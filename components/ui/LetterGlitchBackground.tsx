'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchLetter {
  id: string;
  char: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
}

interface LetterGlitchBackgroundProps {
  density?: number;
  characters?: string;
  className?: string;
}

export function LetterGlitchBackground({ 
  density = 50, 
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  className = ""
}: LetterGlitchBackgroundProps) {
  const [letters, setLetters] = useState<GlitchLetter[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const generateLetters = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      const newLetters: GlitchLetter[] = [];
      
      for (let i = 0; i < density; i++) {
        newLetters.push({
          id: `letter-${i}-${Date.now()}`,
          char: characters[Math.floor(Math.random() * characters.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.3 + 0.1,
          scale: Math.random() * 0.8 + 0.5,
          rotation: Math.random() * 360,
        });
      }
      
      setLetters(newLetters);
    };

    const updateLetters = () => {
      setLetters(prevLetters => 
        prevLetters.map(letter => ({
          ...letter,
          char: Math.random() < 0.3 ? characters[Math.floor(Math.random() * characters.length)] : letter.char,
          opacity: Math.random() < 0.2 ? Math.random() * 0.4 + 0.1 : letter.opacity,
          rotation: Math.random() < 0.1 ? Math.random() * 360 : letter.rotation,
        }))
      );
    };

    // Initial generation
    generateLetters();

    // Update letters periodically
    const interval = setInterval(updateLetters, 200);

    // Regenerate letters occasionally
    const regenerateInterval = setInterval(generateLetters, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(regenerateInterval);
    };
  }, [density, characters, isMounted]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      <AnimatePresence>
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            className="absolute text-xs md:text-sm lg:text-base font-mono text-accent/20 select-none"
            style={{
              left: `${letter.x}%`,
              top: `${letter.y}%`,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              rotate: letter.rotation 
            }}
            animate={{ 
              opacity: letter.opacity,
              scale: letter.scale,
              rotate: letter.rotation,
              x: [0, -2, 2, 0],
              y: [0, -1, 1, 0],
            }}
            exit={{ 
              opacity: 0, 
              scale: 0 
            }}
            transition={{
              duration: 0.3,
              x: {
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              y: {
                duration: 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            {letter.char}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Additional glitch overlay effects */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 0%, rgba(255,0,0,0.1) 25%, transparent 50%, rgba(0,255,255,0.1) 75%, transparent 100%)',
            'linear-gradient(135deg, transparent 0%, rgba(0,255,255,0.1) 25%, transparent 50%, rgba(255,0,0,0.1) 75%, transparent 100%)',
            'linear-gradient(45deg, transparent 0%, rgba(255,0,0,0.1) 25%, transparent 50%, rgba(0,255,255,0.1) 75%, transparent 100%)',
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
