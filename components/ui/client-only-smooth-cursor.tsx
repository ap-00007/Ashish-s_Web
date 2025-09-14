'use client';

import { useState, useEffect } from 'react';
import { SmoothCursor } from './smooth-cursor';

interface ClientOnlySmoothCursorProps {
  cursor?: React.JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

export default function ClientOnlySmoothCursor(props: ClientOnlySmoothCursorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SmoothCursor {...props} />;
}
