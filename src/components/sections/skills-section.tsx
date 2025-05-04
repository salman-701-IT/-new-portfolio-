
'use client';

import React from 'react';
import Image from 'next/image'; // Import Image component
import { Card, CardContent } from '@/components/ui/card';
import SectionContainer from '../section-container';
// Removed Lucide icons that were previously used for skills
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch } from 'lucide-react'; // Keep Lucide imports if needed elsewhere, but they won't be used for skill images directly
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Updated skills array to include imageSrc and aiHint
const skills = [
  { category: 'Frontend', icon: Code, tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'], imageSrc: 'https://picsum.photos/seed/frontend/100/100', aiHint: 'frontend web development code' },
  { category: '3D & Animation', icon: Palette, tools: ['Three.js', 'Spline', 'Framer Motion', 'GSAP'], imageSrc: 'https://picsum.photos/seed/3d/100/100', aiHint: '3d modeling animation abstract' },
  { category: 'Design', icon: Figma, tools: ['Figma', 'Adobe XD'], imageSrc: 'https://picsum.photos/seed/design/100/100', aiHint: 'ui ux design interface' },
  { category: 'Backend & DB', icon: Database, tools: ['Firebase'], imageSrc: 'https://picsum.photos/seed/backend/100/100', aiHint: 'database server backend' },
  { category: 'AI & ML', icon: BrainCircuit, tools: ['Dialogflow', 'TensorFlow.js'], imageSrc: 'https://picsum.photos/seed/ai/100/100', aiHint: 'artificial intelligence brain circuit' },
  { category: 'Programming', icon: GitBranch, tools: ['C', 'C++'], imageSrc: 'https://picsum.photos/seed/programming/100/100', aiHint: 'programming code branch' },
  { category: 'Mobile Dev', icon: Smartphone, tools: ['Dart', 'Flutter'], imageSrc: 'https://picsum.photos/seed/mobile/100/100', aiHint: 'mobile app development phone' },
  { category: 'Embedded Systems', icon: Settings, tools: ['Arduino', 'ESP32', 'Sensors'], imageSrc: 'https://picsum.photos/seed/embedded/100/100', aiHint: 'circuit board electronics iot' },
];


export function SkillsSection() {
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionContainer id="skills" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skillCategory, index) => (
            <Card
                key={index}
                className="glassmorphism group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent hover:scale-[1.02] hover:neon-glow"
            >
                <CardContent className="p-6">
                 <div className="flex flex-col items-center text-center mb-4">
                   {/* Use Image component */}
                   <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-accent transition-colors">
                     <Image
                       src={skillCategory.imageSrc}
                       alt={`${skillCategory.category} icon`}
                       layout="fill"
                       objectFit="cover"
                       data-ai-hint={skillCategory.aiHint}
                       className="transition-transform duration-300 group-hover:scale-110"
                     />
                   </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{skillCategory.category}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {skillCategory.tools.map((tool, toolIndex) => (
                    <span
                        key={toolIndex}
                        className="px-3 py-1 text-xs font-medium bg-secondary rounded-full text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent transition-colors"
                    >
                        {tool}
                    </span>
                    ))}
                </div>
                </CardContent>
                {/* Optional: Add subtle animated background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-accent/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
            </Card>
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}

