"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // Show navbar only on homepage section
  const [visible, setVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeSectionRect = homeSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show navbar if home section is visible (at least 20% of it)
        const isHomeSectionVisible = homeSectionRect.bottom > windowHeight * 0.2;
        setVisible(isHomeSectionVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            y: -100,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        className={cn(
          "flex max-w-fit fixed top-0 inset-x-0 mx-auto border border-white/[0.1] dark:border-white/[0.2] rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-xl backdrop-saturate-150 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.2)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4 mt-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              navItem.name === "Contact"
                ? "relative text-sm font-medium bg-gradient-to-r from-blue-500/70 to-purple-500/70 text-white px-5 py-2 rounded-full backdrop-blur-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ease-out"
                : "relative flex items-center space-x-1 px-3 py-1.5 text-neutral-800 dark:text-white/90 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            )}
          >
            {navItem.name === "Contact" ? (
              <>
                <span className="relative z-10 hidden sm:block">{navItem.name}</span>
                <span className="relative z-10 block sm:hidden">{navItem.icon}</span>
                <span className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                <span className="absolute inset-x-0 w-3/4 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-300 to-transparent h-[2px]" />
              </>
            ) : (
              <>
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                <span className="absolute inset-x-0 -bottom-px h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </>
            )}
          </a>
        ))}
      </motion.div>
      )}
    </AnimatePresence>
  );
};
