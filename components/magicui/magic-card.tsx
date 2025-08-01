"use client";

import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientSize?: number;
}

export const MagicCard: React.FC<MagicCardProps> = ({
  children,
  className,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientSize = 200,
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-background",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">{children}</div>
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute z-0 rounded-full opacity-70 blur-xl filter"
          style={{
            background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 70%)`,
            left: mousePosition.x - gradientSize / 2,
            top: mousePosition.y - gradientSize / 2,
            width: gradientSize,
            height: gradientSize,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: gradientOpacity, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
};
