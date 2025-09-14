import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNav } from '@/components/layout/main-nav';
import { Footer } from '@/components/layout/footer';
import { GridBackground } from '@/components/ui/grid-background';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import ClientOnlySmoothCursor from '@/components/ui/client-only-smooth-cursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashish Panda',
  description: 'A modern, clean, and elegant personal portfolio website for Ashish Panda, a passionate software developer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientOnlySmoothCursor />
        <GridBackground>
          <div className="min-h-screen flex flex-col relative z-10">
            {/* <MainNav /> */}
            <main className="flex-1">{children}</main>
            {/* <Footer /> */}
          </div>
          <ScrollToTop />
        </GridBackground>
      </body>
    </html>
  );
}
