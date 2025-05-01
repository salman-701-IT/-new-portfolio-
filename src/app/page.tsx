import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function Home() {
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
