import { Inter } from 'next/font/google';
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
    <div className={`${inter.className} min-h-screen bg-black overflow-hidden`}>
      {children}
    </div>
  );
}
