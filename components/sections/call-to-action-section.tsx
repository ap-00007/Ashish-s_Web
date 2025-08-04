'use client';

    import { useState, useEffect } from 'react';
    import Link from 'next/link';
    import { motion } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { Download, Terminal } from 'lucide-react';

    import { Button } from '@/components/ui/button';

    export function CallToActionSection() {
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
        <section id="call-to-action" className="py-24 bg-secondary/20" ref={ref}>
          <div className="centered-container text-center">
            <motion.h2
              className="text-4xl font-extrabold mb-8"
              initial="hidden"
              animate={isMounted && inView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
            >
              What I do
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial="hidden"
              animate={isMounted && inView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore my full resume or dive into a simulated terminal experience to see my skills in action.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial="hidden"
              animate={isMounted && inView ? 'visible' : 'hidden'}
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="py-3 text-lg px-8">
                <Link href="/Ashish_Panda_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5 mr-3" /> Download CV
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="py-3 text-lg px-8">
                <Link href="/terminal">
                  <Terminal className="h-5 w-5 mr-3"/> Terminal
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      );
    }
