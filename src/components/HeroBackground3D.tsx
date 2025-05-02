
'use client';

import React, { useRef, Suspense, useEffect, useState } from 'react';
// Removed useFrame import
import { Box, OrbitControls } from '@react-three/drei'; // Using Box for simplicity
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

// Dynamically import Canvas only on the client-side
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);


// Component for the rotating 3D object (no longer used directly with useFrame)
function RotatingElement() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Removed useFrame hook

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[0, 0, -5]}>
        {/* Using MeshStandardMaterial for better lighting effects */}
      <meshStandardMaterial color={'hsl(var(--primary))'} wireframe={true} emissive={'hsl(var(--accent))'} emissiveIntensity={0.5} />
    </Box>
  );
}

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

  // Return a placeholder or null since Canvas is removed
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}>
        <Suspense fallback={<Skeleton className="absolute inset-0 bg-transparent" />}>
            {/* Conditional rendering based on Canvas being loaded (dynamically) */}
            {Canvas ? (
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, 5]} intensity={0.8} color={'hsl(var(--accent))'} />
                    <RotatingElement />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                </Canvas>
            ) : (
                <Skeleton className="absolute inset-0 bg-transparent border border-dashed border-muted-foreground" />
            )}
        </Suspense>
    </div>
  );
}
