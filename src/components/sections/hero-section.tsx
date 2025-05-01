'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
// import ParticleBackground from '../particle-background'; // Import dynamically instead
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

// Dynamically import ParticleBackground with ssr: false
const ParticleBackground = dynamic(
  () => import('../particle-background'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-10 bg-background" />, // Simple background fallback
  }
);

import { Canvas } from '@react-three/fiber';
import { Text3D, Center, OrbitControls } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const AnimatedText3D = animated(Text3D);

function RotatingText() {
  const [hovered, setHovered] = useState(false);
  const { rotation } = useSpring({
    rotation: hovered ? [0, Math.PI * 2, 0] : [0, 0, 0],
    config: { mass: 5, tension: 400, friction: 50 },
  });

  // Prevent hydration mismatch by delaying font loading until client-side
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    setFontLoaded(true); // Assume font is available or handle actual loading if needed
  }, []);

  if (!fontLoaded) {
    return null; // Or a loading state
  }

  return (
    <AnimatedText3D
      font="/fonts/Geist_Bold.json" // Ensure this font path is correct in public/fonts
      size={1}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {`Salman Khan`}
      <meshStandardMaterial color={'hsl(var(--accent))'} emissive={'hsl(var(--accent))'} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
    </AnimatedText3D>
  );
}


function ThreeDText() {
  return (
    <div className="h-64 w-full mb-8">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {/* Suspense is needed for components inside Canvas that might suspend */}
        <Suspense fallback={<Skeleton className="w-32 h-16 mx-auto" />}>
          <Center>
            <RotatingText />
          </Center>
        </Suspense>
        {/* Add OrbitControls if you want users to interact with the 3D text */}
        {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
      </Canvas>
    </div>
  );
}

function HeroSectionComponent() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const mailtoLink = 'mailto:salmankhan701.it@email.com';

  return (
    <SectionContainer id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <ParticleBackground />
      <div ref={ref} className={`z-10 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
        <ThreeDText />

        <div className="mb-8 h-8 text-xl md:text-2xl font-mono text-foreground">
          <TypeAnimation
            sequence={[
              'Website Designer',
              1500,
              'Developer',
              1500,
              'Video Editor',
              1500,
              'Creative Technologist',
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <Button
          size="lg"
          className="relative overflow-hidden group neon-glow-primary hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-shadow duration-300"
          asChild
        >
          <a href="#projects"> {/* Changed href to scroll to projects section */}
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a21caf_0%,#34D399_50%,#a21caf_100%)]" />
            <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-3xl group-hover:text-primary-foreground transition-colors duration-300">
              View My Work
            </span>
          </a>
        </Button>
      </div>
    </SectionContainer>
  );
}

// Add default export if this is the only export and dynamic import expects it
export default HeroSectionComponent;
export const HeroSection = HeroSectionComponent;
