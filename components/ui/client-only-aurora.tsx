'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Aurora with no SSR
const Aurora = dynamic(() => import('./Aurora'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
  ),
});

interface ClientOnlyAuroraProps {
  colorStops: string[];
  blend: number;
  amplitude: number;
  speed: number;
}

export function ClientOnlyAurora(props: ClientOnlyAuroraProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
    );
  }

  return <Aurora {...props} />;
}
