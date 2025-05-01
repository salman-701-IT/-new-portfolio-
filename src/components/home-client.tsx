'use client';

import dynamic from 'next/dynamic';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { HeroSection } from '@/components/sections/hero-section';

// Dynamically import HeroSection with ssr: false now inside a Client Component
/*const HeroSection = dynamic(
  () => import('@/components/sections/hero-section').then((mod) => mod.HeroSection),
  {
    ssr: false,
    loading: () => <Skeleton className="h-screen w-full" />, // Optional: Add a loading state
  }
);*/

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-indigo-950/30">
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
