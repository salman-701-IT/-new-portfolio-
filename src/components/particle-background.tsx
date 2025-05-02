'use client';

import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import Canvas and useFrame from @react-three/fiber at the top level
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), {
  ssr: false,
  loading: () => <Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />,
});
const useFrame = dynamic(() => import('@react-three/fiber').then(mod => mod.useFrame), {
  ssr: false, // useFrame is client-side only
});


function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  // State to hold particle positions, initialized client-side
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 20;
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  // FrameHandler Component to safely use the useFrame hook
  const FrameHandler = () => {
    const frameHook = useFrame; // Get the hook function

    // Should not happen due to dynamic import, but defensive check
    if (!frameHook) return null;

    // Call useFrame inside a component that's guaranteed to run client-side
    frameHook((state) => {
      const { clock } = state;
      if (mesh.current) {
        mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
        mesh.current.rotation.x = clock.getElapsedTime() * 0.02;
      }
      if (light.current) {
        light.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 10;
        light.current.position.z = Math.cos(clock.elapsedTime * 0.5) * 10;
      }
    });
    return null; // This component doesn't render anything itself
  };


  return (
    <>
      <pointLight ref={light} color={'hsl(var(--accent))'} intensity={1.5} distance={30} />
      <points ref={mesh}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.02}
          color={'hsl(var(--primary))'}
          sizeAttenuation
          transparent={false} // Potentially better performance
          depthWrite={true} // Enable depth writing
        />
      </points>
      {/* Conditionally render FrameHandler only on client */}
      {/* Ensure useFrame hook is available before rendering */}
      {typeof window !== 'undefined' && useFrame && <FrameHandler />}
    </>
  );
}

export default function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}>
      {/* Only render Canvas and its children if mounted client-side */}
      {isMounted && Canvas ? (
         <Suspense fallback={<Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />}>
            <Canvas camera={{ position: [0, 0, 1] }}>
              <fog attach="fog" args={['#030712', 10, 20]} />
              <Particles />
            </Canvas>
         </Suspense>
      ) : (
         // Render skeleton or nothing during SSR or before mount
         <Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />
      )}
    </div>
  );
}

