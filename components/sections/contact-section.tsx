'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MagicCard } from '@/components/magicui/magic-card';

export function ContactSection() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="centered-container">
        <motion.h2
        className="text-4xl font-extrabold text-center mb-16"
        initial="hidden"
        animate={isMounted && inView ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate={isMounted && inView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through the form or connect with me on social media.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-accent" />
              <span className="text-lg text-foreground">ashishpanda@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-accent" />
              <span className="text-lg text-foreground">+91 7205602850</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6 text-accent" />
              <span className="text-lg text-foreground">Pune, India🇮🇳</span>
            </div>
          </div>
          <div className="flex space-x-6 pt-4">
            <Link href="https://github.com/ap-00007" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Github className="h-7 w-7" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/ashish-panda-88b104321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="h-7 w-7" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            {/* <Link href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Twitter className="h-7 w-7" />
              <span className="sr-only">Twitter</span>
            </Link> */}
          </div>
        </motion.div>

        <motion.div
          className="max-w-md w-full mx-auto"
          initial="hidden"
          animate={isMounted && inView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0 shadow-none border-none"
          >
            <form
              className="space-y-6 p-8"
              onSubmit={(e) => e.preventDefault()} // Prevent default form submission for demo
            >
              <div className="border-b border-border pb-6">
                <h3 className="text-2xl font-semibold mb-2">Send a Message</h3>
                <p className="text-muted-foreground">I'll get back to you as soon as possible</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" className="mt-2 p-3 text-base" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input id="email" type="email" placeholder="your@example.com" className="mt-2 p-3 text-base" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-base">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={6} className="mt-2 p-3 text-base" />
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <Button type="submit" size="lg" className="w-full py-3 text-lg">Send Message</Button>
              </div>
            </form>
          </MagicCard>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
