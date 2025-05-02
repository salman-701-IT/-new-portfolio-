
'use client'; // Add 'use client' directive

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { cn } from '@/lib/utils';


// Dynamically import the 3D background component, ensuring it only runs client-side
const HeroBackground3D = dynamic(
  () => import('@/components/HeroBackground3D'),
  {
    ssr: false, // Crucial for client-side only rendering
    loading: () => <Skeleton className="absolute inset-0 -z-10 bg-transparent" />, // Loading state
  }
);

// Removed dynamic import for ThreeDText as the component doesn't exist

function HeroSectionComponent() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true, // Trigger animation only once
  });

  return (
    <SectionContainer
      id="hero"
      // Keep relative positioning for content and allow overflow for 3D background
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16" // Added padding top
    >
       {/* Render the 3D Background, which will only fully render client-side */}
      <HeroBackground3D />

      <div
        ref={ref}
        // Ensure content is above the 3D background
        className={cn(
            'relative z-10 transition-all duration-1000 ease-out',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4' // Smooth fade-in and slight upward movement
        )}
      >
        {/* Animated Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow-primary animate-fade-in-slow">
          Salman Khan
        </h1>

        {/* Removed usage of ThreeDText component */}

        {/* Typing animation */}
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

        {/* Call to action button */}
        <Button
          size="lg"
          className="relative overflow-hidden group neon-glow-primary hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-shadow duration-300"
          asChild
        >
          <a href="#projects">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a21caf_0%,#34d399_50%,#a21caf_100%)]" />
            <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-3xl group-hover:text-primary-foreground transition-colors duration-300">
              View My Work
            </span>
          </a>
        </Button>
      </div>
    </SectionContainer>
  );
}
export const HeroSection = HeroSectionComponent;


