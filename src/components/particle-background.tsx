'use client';

import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading

// Dynamically import Canvas and useFrame from @react-three/fiber
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), {
  ssr: false,
  loading: () => <Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />,
});
const useFrame = dynamic(() => import('@react-three/fiber').then(mod => mod.useFrame), {
  ssr: false,
});


function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  // State to hold particle positions, initialized client-side
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Generate particle positions only on the client-side after mount
    const particlesPosition = new Float32Array(count * 3);
    const distance = 20;
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);
      particlesPosition[i * 3] = x;
      particlesPosition[i * 3 + 1] = y;
      particlesPosition[i * 3 + 2] = z;
    }
    setPositions(particlesPosition);
  }, [count]);

  // useFrame needs to be conditionally called or wrapped
  const FrameHandler = () => {
    const frameHook = useFrame; // Get the hook function
    if (!frameHook) return null; // Return null if hook is not available (SSR)

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


  if (!positions) return null; // Don't render points until positions are generated

  return (
    <>
      <pointLight ref={light} color={'hsl(var(--accent))'} intensity={1.5} distance={30} />
      <points ref={mesh}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.02}
          color={'hsl(var(--primary))'}
          sizeAttenuation
          transparent={false} // Changed for potentially better performance
          depthWrite={true} // Enable depth writing
          // blending={THREE.AdditiveBlending} // Removed AdditiveBlending
        />
      </points>
      {/* Conditionally render FrameHandler only on client */}
      {typeof window !== 'undefined' && <FrameHandler />}
    </>
  );
}

export default function ParticleBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render Canvas until mounted on the client
  if (!isMounted) {
    return <Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />;
  }

  // Use Suspense around Canvas provided by the dynamic import
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10 }}>
      <Suspense fallback={<Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <fog attach="fog" args={['#030712', 10, 20]} />
          <Particles />
        </Canvas>
      </Suspense>
    </div>
  );
}
