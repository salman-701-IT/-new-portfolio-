
'use client';

import React, { Suspense, useEffect, useState } from 'react';
// Removed imports for @react-three/drei (Box, OrbitControls)
// Removed import for @react-three/fiber (Canvas, useFrame)
// Removed import for three
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Removed RotatingElement component

// Main component
export default function HeroBackground3D() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Render skeleton placeholder before mount to prevent hydration mismatch
        return <Skeleton className="absolute inset-0 bg-transparent" />;
    }

  // Return a simple placeholder div as all 3D elements are removed
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.1 }} className="flex items-center justify-center text-muted-foreground pointer-events-none">
        <div className="text-xs">[3D Background Placeholder - Canvas Removed]</div>
        {/* Original Canvas code removed
        <Suspense fallback={<Skeleton className="absolute inset-0 bg-transparent" />}>
             <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
               <ambientLight intensity={0.5} />
               <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, 5]} intensity={0.8} color={'hsl(var(--accent))'} />
                 {[...Array(50)].map((_, i) => (
                    <RotatingElement key={i} position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 10 - 5]} />
                ))}
                 <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            </Canvas>
        </Suspense>
        */}
    </div>
  );
}
