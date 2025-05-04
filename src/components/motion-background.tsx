
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
        // Use requestAnimationFrame for smoother updates if performance issues arise
        // requestAnimationFrame(() => {
          setMousePosition({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
          });
        // });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true }); // Use passive listener

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000 ease-in-out' // Ensure it's behind content, smooth color transition
      )}
      style={
        {
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
          background: `
            radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), hsl(var(--primary)/0.15) 0%, transparent 70%), /* Softer primary glow */
            radial-gradient(circle 800px at calc(100% - var(--mouse-x)) calc(100% - var(--mouse-y)), hsl(var(--accent)/0.1) 0%, transparent 70%), /* Softer accent glow */
            hsl(var(--background))
          `,
          transition: 'background 0.5s linear', // Smooth transition for the background gradients
        } as React.CSSProperties
      }
    >
      {/* Optional: Subtle grid or dot pattern overlay */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:16px_16px] opacity-50 mix-blend-overlay"></div> */}
       {/* Optional: Faint noise texture */}
       {/* <div className="absolute inset-0 opacity-5" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}></div> */}
    </div>
  );
};

export default MotionBackground;
