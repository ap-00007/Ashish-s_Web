'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function AboutSection() {
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
    <section id="about" className="py-24" ref={ref}>
      <div className="centered-container">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16"
          initial="hidden"
          animate={isMounted && inView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
              initial="hidden"
              animate={isMounted && inView ? "visible" : "hidden"}
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/IMG_6685.jpg"
                alt="Ashish Panda"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 hover:scale-105"
              />
              {/* Dark vignette effect at the top */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
            </motion.div>
            <div>
                            <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial="hidden"
                animate={isMounted && inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, I'm Ashish Panda, a passionate software developer and data science enthusiast with a love for creating innovative digital solutions. I specialize in full-stack web development and have a keen interest in machine learning and data analytics.
              </motion.p>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial="hidden"
                animate={isMounted && inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or diving deep into data to uncover meaningful insights. I believe in continuous learning and staying up-to-date with the latest industry trends.
              </motion.p>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial="hidden"
                animate={isMounted && inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                My goal is to create meaningful and impactful software that makes a difference in people's lives while continuously growing as a developer and data scientist.
              </motion.p>
            </div>
          </div>
      </div>
    </section>
  );
}
