import { Inter } from 'next/font/google';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Terminal - Ashish Panda',
  description: 'Terminal interface for Ashish Panda\'s portfolio',
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black overflow-hidden`}>
        <SmoothCursor />
        <div className="min-h-screen flex flex-col relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
