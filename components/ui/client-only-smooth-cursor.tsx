'use client';

import { useState, useEffect } from 'react';
import { SmoothCursor } from './smooth-cursor';

export default function ClientOnlySmoothCursor(props: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SmoothCursor {...props} />;
}
