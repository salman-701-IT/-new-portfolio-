'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  // Prevent hydration mismatch for Math.random
  const [positions, setPositions] = useState<Float32Array | null>(null);
  useEffect(() => {
    const particlesPosition = new Float32Array(count * 3);
    const distance = 20;
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      particlesPosition[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      particlesPosition[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      particlesPosition[i * 3 + 2] = distance * Math.cos(theta);
    }
    setPositions(particlesPosition);
  }, [count]);


  useFrame((state) => {
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

  if (!positions) return null; // Don't render until positions are generated client-side

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
          transparent={false} // Keep particles opaque for better performance maybe?
          alphaTest={0.5}
          opacity={0.8}
          depthWrite={false} // Disable depth writing for blending effect
           blending={THREE.AdditiveBlending} // Use AdditiveBlending for glow effect
        />
      </points>
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
