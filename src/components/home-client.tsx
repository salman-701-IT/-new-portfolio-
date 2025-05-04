
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { cn } from '@/lib/utils'; // Import cn
import MotionBackground from '@/components/motion-background'; // Import MotionBackground with lowercase path


// Dynamically import HeroSection with a more visually appealing loading state
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    // ssr: false is handled by 'use client' in HeroSection
     loading: () => (
       <div className="h-screen w-full flex items-center justify-center bg-background">
         {/* Centered, pulsing skeleton matching theme */}
         <Skeleton className="h-1/2 w-3/4 animate-pulse rounded-lg bg-primary/10" />
       </div>
     ),
  }
);


export default function HomeClient() {
  return (
    <div className={cn(
        "relative flex flex-col min-h-screen overflow-hidden"
        // animated-gradient class removed as MotionBackground handles background
        )}>

      {/* Add the Motion Background */}
       <MotionBackground />

      {/* Render all sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

