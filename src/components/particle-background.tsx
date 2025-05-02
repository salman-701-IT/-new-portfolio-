'use client';

import React, { useEffect, useState } from 'react';

// Removed imports for three, @react-three/fiber, and Skeleton

// Removed Particles and FrameHandler components

export default function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Component no longer renders anything
  if (!isMounted) {
      return null; // Don't render anything until mounted
  }

  // Return null as the Canvas is removed
  return null;
}
