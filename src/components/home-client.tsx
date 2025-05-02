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

// Dynamically import HeroSection with ssr: false (if needed, handled inside)
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    ssr: false, // Ensure HeroSection logic runs client-side if it uses client hooks/APIs
    loading: () => <Skeleton className="h-screen w-full" />,
  }
);

// Removed dynamic import for ParticleBackground

export default function HomeClient() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/30 overflow-hidden">
      {/* Removed ParticleBackground component rendering */}

      {/* Render other sections normally */}
      {/* Suspense for HeroSection is handled by its dynamic import */}
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
