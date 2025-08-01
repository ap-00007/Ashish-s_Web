'use client';

import React from 'react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { IconHome, IconMessage, IconUser, IconCode, IconBriefcase } from '@tabler/icons-react';

export function MainNav() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Technologies",
      link: "#technologies",
      icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-md h-10 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50 rounded-full pointer-events-none z-40" />
      <FloatingNav navItems={navItems} />
    </div>
  );
}
