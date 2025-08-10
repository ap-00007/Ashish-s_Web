import React from 'react';
import '../globals.css';
import { Inter } from 'next/font/google';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

const inter = Inter({ subsets: ['latin'] });

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`} suppressHydrationWarning>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}