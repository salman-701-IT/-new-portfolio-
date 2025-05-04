
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


// Dynamically import HeroSection with ssr: false (handled inside hero-section.tsx)
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    // ssr: false, // Ensure HeroSection logic runs client-side if it uses client hooks/APIs - Handled by 'use client' in HeroSection
    loading: () => <Skeleton className="h-screen w-full" />,
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

