
'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
// Removed Canvas import
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { Skeleton } from '@/components/ui/skeleton';
// Removed direct import of GeistBold from public

// Animated Text Component
function AnimatedText({ fontData }: { fontData: any }) {
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

  // Don't render if fontData is not loaded
  if (!fontData) {
    return null;
  }

  return (
    <animated.mesh
        ref={textRef}
        scale={springProps.scale as any}
        rotation={springProps.rotation as any}
        >
      <Text3D
        font={fontData} // Use loaded font data
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.03}
        bevelOffset={0}
        bevelSegments={5}
      >
        SALMAN KHAN
        <animated.meshStandardMaterial
            color={springProps.color}
            emissive={'hsl(var(--accent))'}
            emissiveIntensity={0.3}
            metalness={0.6}
            roughness={0.3}
            wireframe={false}
            />
      </Text3D>
    </animated.mesh>
  );
}

// Main component
export default function ThreeDTextClient() {
   const [isMounted, setIsMounted] = useState(false);
   const [fontData, setFontData] = useState<any>(null); // State for font data
   const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        setIsMounted(true);
        // Fetch font data on mount
        fetch('/fonts/Geist_Bold.json') // Fetch from the public URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFontData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to load font:', error);
                setIsLoading(false); // Stop loading even on error
            });
    }, []);

    if (!isMounted || isLoading) {
       return <Skeleton className="h-[250px] w-full bg-transparent" />;
    }

  // This component needs Canvas to render anything
  // Since Canvas was removed, return a placeholder or null
  return (
     <div style={{ height: '250px', width: '100%', cursor: 'pointer' }} className="flex items-center justify-center text-muted-foreground">
        3D Text Placeholder (Canvas removed)
        {/* Original Canvas code commented out:
         <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Center>
              <AnimatedText fontData={fontData} />
            </Center>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
       */}
    </div>
  );
}
