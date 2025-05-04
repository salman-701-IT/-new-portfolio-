'use client'; // Add 'use client' directive

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { cn } from '@/lib/utils';
import { Hand, Mail, Sparkles } from 'lucide-react'; // Import Hand, Mail, and Sparkles icons
import MotionBackground from '@/components/motion-background'; // Import MotionBackground

// Dynamically import the Particle Background component placeholder
const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
  loading: () => <Skeleton className="absolute inset-0 -z-10 bg-transparent" /> // Use transparent background for loading skeleton
});


// Placeholder for 3D Text Component - ensure this component exists or remove if not needed
// Removed dynamic import as component doesn't exist


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
      // Keep relative positioning for content and allow overflow for background elements
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20 pb-10" // Adjusted padding
    >
       {/* Motion Background */}
       <MotionBackground />
       {/* Optional Particle Background */}
       {/* Removed ParticleBackground due to persistent errors */}
       {/* <ParticleBackground /> */}


      <div
        ref={ref}
        // Ensure content is above the background elements
        className={cn(
            'relative z-10 transition-all duration-1000 ease-out',
            inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm' // Smooth fade-in, upward movement, and unblur
        )}
      >
         {/* Greeting Message - Only render on client */}
         {isMounted && greeting && (
            <div className="mb-4 text-lg md:text-xl text-accent flex items-center justify-center gap-2 animate-fade-in-slow" style={{ animationDelay: '0.2s' }}>
              <Hand className="h-5 w-5 animate-wave text-primary" /> {greeting}! I'm
            </div>
          )}

        {/* Name with enhanced styling - Using H1 */}
        <h1
            className={cn(
                "text-5xl md:text-7xl font-bold mb-4 text-foreground animate-fade-in-slow transition-transform duration-300 hover:scale-[1.03]", // Added hover scale
                "bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary", // Gradient text
                "text-glow-primary" // Existing glow effect
            )}
            style={{ animationDelay: '0.5s' }}
        >
            Salman Khan S.
        </h1>
         {/* Removed Suspense wrapper and ThreeDText component placeholder */}


        {/* Typing animation for roles - Updated roles for professionalism */}
        <div className="mb-6 h-8 text-xl md:text-2xl font-mono text-foreground animate-fade-in-slow" style={{ animationDelay: '0.8s' }}>
          <TypeAnimation
            sequence={[
              'Creative Technologist', // Start with the main role
              2000,
              'Full Stack Developer', // More specific
              1500,
              'AI Solutions Architect', // More specific
              1500,
              'Digital Media Specialist', // More professional
              1500,
              'Technology Educator', // More professional
              1500,
              'UI/UX Designer', // More specific
              1500,
              'Founder @ Yumaris Agency', // Keep Founder
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Added Descriptive Text */}
        <p
            className="max-w-2xl mx-auto text-base md:text-lg text-foreground/80 mb-10 animate-fade-in-slow"
            style={{ animationDelay: '1.0s' }}
        >
           Based in Chennai, India, I craft innovative digital experiences, blending cutting-edge web technologies with AI, creative media, and education to empower businesses and learners worldwide. Let's build something truly remarkable together. Your vision, amplified by technology.
        </p>


        {/* Call to action button - Link to email */}
        <div className="animate-fade-in-slow" style={{ animationDelay: '1.2s' }}>
            <Button
            size="lg"
            className={cn(
                "relative overflow-hidden group neon-glow-primary",
                "hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-all duration-500 ease-out", // Smoother transition
                "hover:scale-105 active:scale-100" // Added hover/active scale
            )}
            asChild
            >
            <a href="mailto:salmankhan701.it@email.com?subject=Project%20Inquiry:%20Let's%20Collaborate">
                {/* Conic gradient background */}
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary)/0.8)_0%,hsl(var(--accent)/0.8)_50%,hsl(var(--primary)/0.8)_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Inner content span */}
                <span className="relative z-10 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-sm group-hover:text-primary-foreground transition-colors duration-300 group-hover:bg-transparent">
                 <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-125 group-hover:animate-pulse" /> Let's Collaborate
                </span>
            </a>
            </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
export const HeroSection = HeroSectionComponent;
