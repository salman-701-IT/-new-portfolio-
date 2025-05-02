
'use client';

import React, { useRef, Suspense, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber'; // Keep useFrame if other logic needs it, otherwise remove
import { Box, OrbitControls } from '@react-three/drei'; // Using Box for simplicity
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';

// Component for the rotating 3D object
function RotatingElement() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Rotate mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[0, 0, -5]}>
        {/* Using MeshStandardMaterial for better lighting effects */}
      <meshStandardMaterial color={'hsl(var(--primary))'} wireframe={true} emissive={'hsl(var(--accent))'} emissiveIntensity={0.5} />
    </Box>
  );
}

// Main component - No longer renders Canvas
export default function HeroBackground3D() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <Skeleton className="absolute inset-0 bg-transparent" />;
    }

  // Return a placeholder or null since Canvas is removed
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}>
        {/* Canvas removed */}
        {/* Optional: Keep Suspense if you plan to add other async components here */}
        {/* <Suspense fallback={<Skeleton className="absolute inset-0 bg-transparent" />}> */}
            {/* Render placeholder or nothing */}
             <Skeleton className="absolute inset-0 bg-transparent border border-dashed border-muted-foreground" />
            {/* Example placeholder content */}
            {/* <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              3D Background Placeholder
            </div> */}
        {/* </Suspense> */}
    </div>
  );
}
