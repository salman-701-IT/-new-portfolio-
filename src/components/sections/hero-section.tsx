
'use client'; // Add 'use client' directive

import React, { useState, useEffect, Suspense } from 'react'; // Import useState and useEffect
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { cn } from '@/lib/utils';
import { Hand, Mail } from 'lucide-react'; // Import Hand and Mail icons

// Dynamically import the 3D Text Component placeholder - Removed as component doesn't exist


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
       {/* Placeholder for removed Particle Background */}


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
              <Hand className="h-5 w-5 animate-bounce text-primary" /> {greeting}! I'm
            </div>
          )}

        {/* Animated Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow-primary animate-fade-in-slow" style={{ animationDelay: '0.5s' }}>
           <TypeAnimation
              sequence={['Salman Khan', 3000, '']} // Repeat name animation
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={30}
            />
        </h1>

        {/* Placeholder for 3D Text */}
         <div className="h-[50px] md:h-[60px] mb-8 flex items-center justify-center"> {/* Adjusted height for text */}
             {/* Placeholder text since 3D text is removed */}
             {/* <p className="text-muted-foreground text-sm">[3D Text Placeholder Removed]</p> */}
         </div>


        {/* Typing animation for roles */}
        <div className="mb-8 h-8 text-xl md:text-2xl font-mono text-foreground animate-fade-in-slow" style={{ animationDelay: '0.8s' }}>
          <TypeAnimation
            sequence={[
              'Creative Technologist', // Start with the main role
              2000,
              'Web Developer',
              1500,
              'AI Enthusiast',
              1500,
              'Video Editor',
              1500,
              'Educator',
              1500,
              'Designer',
              1500,
              'Founder @ Yumaris',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Call to action button - Link to email */}
        <div className="animate-fade-in-slow" style={{ animationDelay: '1.1s' }}>
            <Button
            size="lg"
            className="relative overflow-hidden group neon-glow-primary hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-shadow duration-300"
            asChild
            >
            <a href="mailto:salmankhan701.it@email.com?subject=Project%20Inquiry">
                {/* Conic gradient background */}
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary)/0.8)_0%,hsl(var(--accent)/0.8)_50%,hsl(var(--primary)/0.8)_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Inner content span */}
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm group-hover:text-primary-foreground transition-colors duration-300 group-hover:bg-transparent">
                 <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> Contact Me
                </span>
            </a>
            </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
export const HeroSection = HeroSectionComponent;
