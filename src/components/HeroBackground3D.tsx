'use client';

import React, { useRef, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, OrbitControls } from '@react-three/drei'; // Using Box for simplicity
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import Canvas and useFrame only on the client
const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });
const useFrame = dynamic(() => import('@react-three/fiber').then((mod) => mod.useFrame), { ssr: false });


// Component for the rotating 3D object
function RotatingElement() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const frameHook = useFrame(); // Get the hook function

  // Rotate mesh every frame only if useFrame is loaded
  frameHook?.((state, delta) => {
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

// Main component to render the Canvas and the 3D element
export default function HeroBackground3D() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !Canvas || !useFrame) {
    // Render skeleton or null while waiting for mount or dynamic imports
    return <Skeleton className="absolute inset-0 bg-transparent" />;
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}>
      <Suspense fallback={<Skeleton className="absolute inset-0 bg-transparent" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
           <pointLight position={[-10, -10, 5]} intensity={0.8} color={'hsl(var(--accent))'} />
          <RotatingElement />
          {/* OrbitControls can be useful for debugging, remove for production if not needed */}
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}
