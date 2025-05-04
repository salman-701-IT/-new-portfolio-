
'use client'; // Add 'use client' directive

import React, { useState, useEffect, Suspense } from 'react'; // Import useState and useEffect
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { cn } from '@/lib/utils';
import { Hand } from 'lucide-react'; // Import Hand icon

// Dynamically import the 3D background component, ensuring it only runs client-side
// Removed dynamic import for HeroBackground3D as it caused errors
// Dynamically import ParticleBackground
const ParticleBackground = dynamic(
  () => import('@/components/particle-background'),
  {
    ssr: false,
    loading: () => <Skeleton className="absolute inset-0 -z-10 bg-[#030712]" />,
  }
);

// Dynamically import the 3D Text Component placeholder - Removed as component doesn't exist
// const ThreeDText = dynamic(() => import('@/components/ThreeDTextClient'), {
//   ssr: false,
//   loading: () => <Skeleton className="h-64 w-full mb-8" />,
// });


function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}


function HeroSectionComponent() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true, // Trigger animation only once
  });
  const [greeting, setGreeting] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setGreeting(getGreeting());
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <SectionContainer
      id="hero"
      // Keep relative positioning for content and allow overflow for 3D background
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16" // Added padding top
    >
       {/* Render the Particle Background, which will only fully render client-side */}
        <ParticleBackground />


      <div
        ref={ref}
        // Ensure content is above the 3D background
        className={cn(
            'relative z-10 transition-all duration-1000 ease-out',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4' // Smooth fade-in and slight upward movement
        )}
      >
         {/* Greeting Message - Only render on client */}
         {isMounted && greeting && (
            <div className="mb-4 text-lg md:text-xl text-accent flex items-center justify-center gap-2 animate-fade-in-slow" style={{ animationDelay: '0.2s' }}>
              <Hand className="h-5 w-5 animate-bounce" /> {greeting}! I'm
            </div>
          )}

        {/* Animated Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow-primary animate-fade-in-slow" style={{ animationDelay: '0.5s' }}>
          Salman Khan
        </h1>

        {/* Placeholder for 3D Text */}
        {/* <ThreeDText /> */}
         <div className="h-[50px] md:h-[60px] mb-8 flex items-center justify-center"> {/* Adjusted height for text */}
            {/* Ensure skeleton has appropriate height if needed */}
            {/* <Skeleton className="h-full w-64" /> */}
         </div>


        {/* Typing animation */}
        <div className="mb-8 h-8 text-xl md:text-2xl font-mono text-foreground animate-fade-in-slow" style={{ animationDelay: '0.8s' }}>
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
        <div className="animate-fade-in-slow" style={{ animationDelay: '1.1s' }}>
            <Button
            size="lg"
            className="relative overflow-hidden group neon-glow-primary hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-shadow duration-300"
            asChild
            >
            <a href="#projects">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)]" />
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-3xl group-hover:text-primary-foreground transition-colors duration-300">
                View My Work
                </span>
            </a>
            </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
export const HeroSection = HeroSectionComponent;
