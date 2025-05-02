
'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';

// Geist Bold font data - ensure public/fonts/Geist_Bold.json exists and is valid
// Note: Adjusted import path assuming 'fonts' directory is directly under 'public'
import GeistBold from '../../public/fonts/Geist_Bold.json';

// Animated Text Component
function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null!);

  const springProps = useSpring({
    from: { scale: [0.5, 0.5, 0.5], rotation: [0, 0, 0], color: 'hsl(var(--primary))' },
    to: [
      { scale: [1.1, 1.1, 1.1], rotation: [0.1, 0.2, 0], color: 'hsl(var(--accent))' },
      { scale: [1, 1, 1], rotation: [0, 0, 0], color: 'hsl(var(--primary))' },
    ],
    config: { mass: 2, tension: 200, friction: 25 },
    loop: { reverse: true },
  });

  // Subtle hover effect
  const handlePointerOver = () => {
     if (textRef.current) {
        // Example: Slightly change color or scale on hover
        // This requires more complex state management or direct manipulation
     }
  };

  const handlePointerOut = () => {
     if (textRef.current) {
        // Revert changes
     }
  };


  return (
    <animated.mesh
        ref={textRef}
        scale={springProps.scale as any} // Type assertion might be needed depending on spring version
        rotation={springProps.rotation as any} // Type assertion might be needed
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        >
      <Text3D
        font={GeistBold as any} // Needs proper path and type casting
        size={1.5} // Adjusted size for potentially larger text
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05} // Increased bevel thickness
        bevelSize={0.03} // Increased bevel size
        bevelOffset={0}
        bevelSegments={5}
      >
        SALMAN KHAN
        {/* Using MeshWobbleMaterial for a more dynamic effect */}
        <animated.meshStandardMaterial
            color={springProps.color}
            emissive={'hsl(var(--accent))'}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
            wireframe={false} // Changed to false for solid look
            />
      </Text3D>
    </animated.mesh>
  );
}

// Main component to render the 3D text within a Canvas
export default function ThreeDTextClient() {
   // No need for isMounted check here
  return (
    <div style={{ height: '250px', width: '100%', cursor: 'pointer' }}>
      <Suspense fallback={<Skeleton className="h-full w-full bg-transparent" />}>
        <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -5, 5]} intensity={0.7} color={'hsl(var(--accent))'} />
          <Center>
            <AnimatedText />
          </Center>
          {/* Add OrbitControls for interactivity during development/testing */}
          {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}
