'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          animate={inView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
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
                animate={inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hello! I&apos;m Ashish Panda, a second-year engineering student at VIT Pune with a strong interest in core programming and problem solving. Most of my work so far has been in C++ and Python—using them to explore everything from pattern printing and recursion to data structures, dynamic programming, and matrix manipulation.
              </motion.p>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I've written code that handles real input, stores data in efficient formats like sparse matrix triplets using structs, and solves optimization problems with clean logic. I've worked on CLI-level applications and debugged everything from simple formatting bugs to scope errors in standard libraries.
              </motion.p>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Python is where I experiment with logic fast. C++ is where I go when I want control and precision. I'm also getting into areas like AI, API integration, and front-end dev (React, mostly), and I like writing clean, readable code that does something useful—not just academically, but practically.Every time I code, I try to improve the way I think—not just the output on screen.
              </motion.p>
            </div>
          </div>
      </div>
    </section>
  );
}
