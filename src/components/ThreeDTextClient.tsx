
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Animated Text Component
function AnimatedText({ fontData }: { fontData: any }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const springProps = useSpring({
    scale: hovered ? 1.1 : 1,
    color: hovered ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <animated.mesh
      ref={meshRef}
      scale={springProps.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text3D font={fontData} size={1} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02} bevelOffset={0} bevelSegments={5}>
        {`SALMAN\nKHAN`}
        <animated.meshStandardMaterial
          color={springProps.color}
          metalness={0.6}
          roughness={0.4}
          envMapIntensity={0.8}
        />
      </Text3D>
    </animated.mesh>
  );
}

// Main 3D Text Client Component
export default function ThreeDTextClient() {
  const [fontData, setFontData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component is mounted on the client
    const fetchFontData = async () => {
      try {
        const response = await fetch('/fonts/Geist_Bold.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Basic validation - check if it looks like THREE.js font data
        if (data && data.glyphs && data.boundingBox) {
           setFontData(data);
        } else {
            // If the fetched data is not valid, use a fallback or show error
            console.warn("Fetched font data is not in the expected format. Using fallback text.");
            setError("Failed to load 3D font.");
            // Optionally, provide a THREE.js FontLoader compatible fallback object
            // Or handle this case by rendering 2D text or a loading indicator
        }

      } catch (e: any) {
        console.error("Failed to fetch font data:", e);
        setError("Failed to load 3D font.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFontData();
  }, []);

  // Avoid rendering canvas until mounted and font is loaded/failed
  if (!isMounted) {
    return <div className="h-64 w-full mb-8 flex items-center justify-center"><p>Loading 3D Text...</p></div>; // Or Skeleton
  }
  if (isLoading) {
     return <div className="h-64 w-full mb-8 flex items-center justify-center"><p>Loading 3D Font...</p></div>; // Or Skeleton
  }
  if (error || !fontData) {
     // Render fallback 2D text or error message if font loading fails
     return (
       <div className="h-64 w-full mb-8 flex flex-col items-center justify-center text-center">
         <h1 className="text-6xl font-bold text-accent leading-tight">SALMAN</h1>
         <h1 className="text-6xl font-bold text-accent leading-tight">KHAN</h1>
         {error && <p className="text-destructive text-sm mt-2">{error}</p>}
       </div>
     );
  }


  return (
    <div className="h-64 w-full mb-8">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="hsl(var(--accent))" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="hsl(var(--primary))" />
        <Center>
          <AnimatedText fontData={fontData} />
        </Center>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

