'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LetterGlitchProps {
  text: string;
  className?: string;
  glitchChance?: number;
  glitchDuration?: number;
  characters?: string;
}

export function LetterGlitch({ 
  text, 
  className,
  glitchChance = 0.02,
  glitchDuration = 150,
  characters = "!<>-_\\/[]{}—=+*^?#________"
}: LetterGlitchProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const glitchEffect = () => {
      const textArray = text.split('');
      setIsGlitching(true);
      
      // Create multiple glitch frames
      let frameCount = 0;
      const maxFrames = 3;
      
      const glitchFrame = () => {
        const glitchedText = textArray.map((char, index) => {
          if (char === ' ') return char;
          
          if (Math.random() < glitchChance * 3) { // Higher chance during glitch
            return characters[Math.floor(Math.random() * characters.length)];
          }
          return char;
        }).join('');

        setDisplayText(glitchedText);
        frameCount++;

        if (frameCount < maxFrames) {
          setTimeout(glitchFrame, 50);
        } else {
          // Reset to original text
          setTimeout(() => {
            setDisplayText(text);
            setIsGlitching(false);
          }, glitchDuration);
        }
      };

      glitchFrame();
    };

    // Run glitch effect periodically
    intervalRef.current = setInterval(glitchEffect, 4000 + Math.random() * 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, glitchChance, glitchDuration, characters, isMounted]);

  return (
    <motion.span
      className={cn("inline-block relative", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        textShadow: isGlitching ? '2px 0 #ff0000, -2px 0 #00ffff' : 'none',
        filter: isGlitching ? 'blur(0.5px)' : 'none',
      }}
    >
      {displayText.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}-${displayText}`}
          className="inline-block"
          animate={{
            x: char !== text[index] && isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
            y: char !== text[index] && isGlitching ? [0, -1, 1, 0] : 0,
            opacity: char !== text[index] && isGlitching ? [1, 0.8, 1, 0.9, 1] : 1,
            scale: char !== text[index] && isGlitching ? [1, 1.05, 0.95, 1] : 1,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
      
      {/* Additional glitch overlay effect */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
          transition={{ duration: 0.2, repeat: 2 }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.1) 25%, transparent 50%, rgba(0,255,255,0.1) 75%, transparent 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      )}
    </motion.span>
  );
}