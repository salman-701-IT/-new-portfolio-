'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Keep Skeleton if needed for fallback

// Removed imports for three, @react-three/fiber

// Removed Particles and FrameHandler components

export default function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Component no longer renders the Canvas
  if (!isMounted) {
    // Optional: Show skeleton or null during initial mount phase
    return <Skeleton className="absolute inset-0 -z-10 bg-background" />;
  }

  // Return null as the Canvas and its contents are removed
  return null;
}
