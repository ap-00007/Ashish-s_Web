'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { LetterGlitch } from '@/components/ui/letter-glitch';
import { LetterGlitchBackground } from '@/components/ui/letter-glitch-background';
import { RoleGlitch } from '@/components/ui/role-glitch';
import { ClientOnlyAurora } from '@/components/ui/client-only-aurora';

export function HeroSection() {
  return (
    <section id="home" className="relative flex h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 md:px-8">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <ClientOnlyAurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Letter Glitch Background */}
      <div className="absolute inset-0 z-10">
        <LetterGlitchBackground density={60} />
      </div>
      
      <div className="z-20 flex flex-col items-center text-center relative centered-container">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Hello, I&apos;m{' '}
          <LetterGlitch text="Ashish" className="text-accent" />.
          <br />
          A Passionate <RoleGlitch className="text-accent" />
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Crafting elegant and efficient solutions with a focus on user experience and clean code.
        </motion.p>
        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <Button asChild size="lg" className="px-8 py-3 text-lg">
            <Link href="#projects">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg">
            <Link href="#contact">
              Get in Touch
            </Link>
          </Button>
        </motion.div>
      </div>
      {/* Subtle background animation - reduced opacity to work with Aurora */}
      <motion.div
        className="absolute inset-0 z-5 opacity-5"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 2, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
        style={{
          background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)',
        }}
      />
    </section>
  );
}
