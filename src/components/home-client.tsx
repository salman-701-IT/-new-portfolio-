
'use client';

import dynamic from 'next/dynamic';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import React, { Suspense } from 'react';

// Dynamically import HeroSection with ssr: false
const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    ssr: false,
    loading: () => <Skeleton className="h-screen w-full" />,
  }
);

// Dynamically import the Particle Background Component
const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
  // Optional: Add a simple background color as loading state
  loading: () => <div className="absolute inset-0 -z-10 bg-[#030712]" />,
});

export default function HomeClient() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/30 overflow-hidden">
      {/* Render Particle Background absolutely positioned */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<div className="absolute inset-0 -z-10 bg-[#030712]" />}>
           <ParticleBackground />
        </Suspense>
      </div>

      {/* Render other sections normally */}
      <Suspense fallback={<Skeleton className="h-screen w-full" />}>
        <HeroSection />
      </Suspense>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
