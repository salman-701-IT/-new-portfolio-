'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionContainer from '../section-container';
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch } from 'lucide-react'; // Example icons, replace/add as needed
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const skills = [
  { category: 'Frontend', icon: Code, tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
  { category: '3D & Animation', icon: Palette, tools: ['Three.js', 'Spline', 'Framer Motion', 'GSAP'] },
  { category: 'Design', icon: Figma, tools: ['Figma', 'Adobe XD'] }, // Assuming Adobe XD icon isn't in lucide
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
                <div className="flex items-center mb-4">
                    <skillCategory.icon className="w-6 h-6 mr-3 text-primary group-hover:text-accent transition-colors" />
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{skillCategory.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
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
