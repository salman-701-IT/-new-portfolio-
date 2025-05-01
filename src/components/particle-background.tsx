
'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!);
  const light = useRef<THREE.PointLight>(null!);

  // State to hold particle positions, initialized client-side to avoid hydration mismatch
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
  }, [count]); // Dependency array ensures this runs once on mount or when count changes

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

  // Don't render the points until the positions are generated on the client
  if (!positions) return null;

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
          transparent={true} // Keep particles opaque for potential performance boost
          alphaTest={0.5}
          opacity={0.9}
          depthWrite={false} // Disable depth writing for blending effect
          blending={THREE.AdditiveBlending} // Use AdditiveBlending for glow effect
        />
      </points>
    </>
  );
}

export default function ParticleBackground() {
  // The Canvas should take up the full container it's placed in
  return (
    <Canvas camera={{ position: [0, 0, 1] }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <fog attach="fog" args={['#030712', 10, 20]} />
      {/* Suspense is handled by the dynamic import in home-client.tsx */}
      <Particles />
    </Canvas>
  );
}
