import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "absolute inset-0 opacity-50",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#404040_1px,transparent_1px),linear-gradient(to_bottom,#404040_1px,transparent_1px)]",
        )}
      />
      {/* Very subtle radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-black/10"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
