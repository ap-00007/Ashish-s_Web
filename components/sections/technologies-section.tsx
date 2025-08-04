'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import {
  Code,
  Database,
  Cloud,
  GitBranch,
  Figma,
  Server,
  Smartphone,
  Globe,
  Zap,
  LayoutGrid,
  Type,
  Palette,
  Cpu,
  Shield,
  Rocket,
  Sparkles,
} from 'lucide-react';

const technologies = [
  { name: 'React', icon: Code, description: 'Frontend Library' },
  { name: 'Next.js', icon: Rocket, description: 'React Framework' },
  { name: 'TypeScript', icon: Type, description: 'Typed JavaScript' },
  { name: 'Tailwind CSS', icon: Palette, description: 'Utility-first CSS' },
  { name: 'Node.js', icon: Server, description: 'Backend Runtime' },
  { name: 'Express.js', icon: Globe, description: 'Web Framework' },
  { name: 'Python', icon: Cpu, description: 'Programming Language' },
  { name: 'Flask', icon: Cloud, description: 'Python Web Framework' },
  { name: 'NumPy', icon: LayoutGrid, description: 'Scientific Computing' },
  { name: 'Pandas', icon: Database, description: 'Data Analysis' },
  { name: 'Scikit-learn', icon: Sparkles, description: 'Machine Learning' },
  { name: 'MongoDB', icon: Database, description: 'NoSQL DB' },
  { name: 'Git', icon: GitBranch, description: 'Version Control' },
  { name: 'Figma', icon: Figma, description: 'UI/UX Design' },
  { name: 'REST APIs', icon: Zap, description: 'API Architecture' },
  { name: 'Responsive Design', icon: Smartphone, description: 'Cross-device UI' },
  { name: 'Unit Testing', icon: Shield, description: 'Code Quality' },

];

const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

const TechnologyCard = ({
  name,
  icon: Icon,
  description,
}: {
  name: string;
  icon: any;
  description: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-6",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "flex flex-col items-center justify-center group transition-all duration-300"
      )}
    >
      <Icon className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
      <figcaption className="text-xl font-semibold text-foreground mb-1 text-center">
        {name}
      </figcaption>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </figure>
  );
};

export function TechnologiesSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="technologies" className="py-24" ref={ref}>
      <div className="centered-container">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-16"
          initial="hidden"
          animate={isMounted && inView ? "visible" : "hidden"}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          Technologies I Use
        </motion.h2>
      </div>
      
      <motion.div
        className="relative flex w-screen flex-col items-center justify-center overflow-hidden -mx-[50vw] left-1/2"
        initial="hidden"
        animate={isMounted && inView ? "visible" : "hidden"}
        variants={itemVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((tech) => (
            <TechnologyCard key={tech.name} {...tech} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((tech) => (
            <TechnologyCard key={tech.name} {...tech} />
          ))}
        </Marquee>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
      </motion.div>
    </section>
  );
}
