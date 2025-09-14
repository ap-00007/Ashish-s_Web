import React from 'react';
import ClientOnlySmoothCursor from '@/components/ui/client-only-smooth-cursor';

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <ClientOnlySmoothCursor />
      {children}
    </div>
  );
}
