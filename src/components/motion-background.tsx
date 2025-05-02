// src/components/motion-background.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const MotionBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 -z-10 overflow-hidden transition-opacity duration-1000 ease-in-out' // Ensure it's behind content
      )}
      style={
        {
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
          background: `
            radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary)/0.2) 0%, transparent 30%),
            radial-gradient(circle at calc(100% - var(--mouse-x)) calc(100% - var(--mouse-y)), hsl(var(--accent)/0.2) 0%, transparent 30%),
            hsl(var(--background))
          `,
        } as React.CSSProperties
      }
    >
      {/* Optional: Add subtle particle/grid overlay if desired */}
      {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 mix-blend-overlay"></div> */}
    </div>
  );
};

export default MotionBackground;
