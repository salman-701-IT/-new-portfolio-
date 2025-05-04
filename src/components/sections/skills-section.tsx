
'use client';

import React from 'react';
// Removed Image component import
import { Card, CardContent } from '@/components/ui/card';
import SectionContainer from '../section-container';
// Re-introduced necessary Lucide icons
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Updated skills array to re-include icon property
const skills = [
  { category: 'Frontend', icon: Code, tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
  { category: '3D & Animation', icon: Palette, tools: ['Three.js', 'Spline', 'Framer Motion', 'GSAP'] },
  { category: 'Design', icon: Figma, tools: ['Figma', 'Adobe XD'] },
  { category: 'Backend & DB', icon: Database, tools: ['Firebase'] },
  { category: 'AI & ML', icon: BrainCircuit, tools: ['Dialogflow', 'TensorFlow.js'] },
  { category: 'Programming', icon: GitBranch, tools: ['C', 'C++'] },
  { category: 'Mobile Dev', icon: Smartphone, tools: ['Dart', 'Flutter'] },
  { category: 'Embedded Systems', icon: Settings, tools: ['Arduino', 'ESP32', 'Sensors'] },
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
                   {/* Use Lucide Icon component */}
                   <skillCategory.icon className="w-10 h-10 mb-3 text-primary transition-colors group-hover:text-accent" />
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

