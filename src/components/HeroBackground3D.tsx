
'use client';

import React, { Suspense, useEffect, useState } from 'react';
// Removed imports for @react-three/drei (Box, OrbitControls)
// Removed import for @react-three/fiber (Canvas, useFrame)
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Dynamically import Canvas only on the client-side (though not used directly anymore)
// This is kept in case future re-integration is needed, but could be removed.
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

// Removed RotatingElement component as Box is no longer imported/used

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
        <div className="text-xs">[3D Background Placeholder]</div>
        {/* Original Canvas code removed as its dependencies are causing errors
        <Suspense fallback={<Skeleton className="absolute inset-0 bg-transparent" />}>
            {Canvas ? (
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, 5]} intensity={0.8} color={'hsl(var(--accent))'} />
                    {/* Removed RotatingElement usage * /}
                    {/* Removed OrbitControls usage * /}
                </Canvas>
            ) : (
                <Skeleton className="absolute inset-0 bg-transparent border border-dashed border-muted-foreground" />
            )}
        </Suspense>
        */}
    </div>
  );
}
