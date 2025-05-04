'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import SectionContainer from '../section-container';
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch, Film, Search, BarChart, Lock, GraduationCap, Box, Paintbrush } from 'lucide-react'; // Added more relevant icons
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Updated skills array based on the provided text
const skills = [
  { category: 'Web Development', icon: Code, tools: ['React', 'JavaScript', 'Next.js', 'Firebase', 'Tailwind CSS', 'HTML', 'CSS'] },
  { category: 'AI & Automation', icon: BrainCircuit, tools: ['Dialogflow Chatbots', 'AI Automation', 'Course Recommenders', 'TensorFlow.js'] },
  { category: 'Creative Media', icon: Film, tools: ['Video Editing (YouTube, Reels)', 'Motion Graphics', 'Creative Content'] },
  { category: 'Design & Branding', icon: Paintbrush, tools: ['UI/UX Design (Figma)', 'Branding', 'Poster Design', 'Digital Content'] },
  { category: 'Marketing & SEO', icon: Search, tools: ['SEO', 'Digital Marketing'] },
  { category: 'Futuristic Tech', icon: Fingerprint, tools: ['Face Recognition/Liveness', '3D UI & Animation', 'Voice Interfaces'] },
  { category: 'Embedded & IoT', icon: Settings, tools: ['IoT', 'Arduino', 'ESP32'] },
  { category: 'Education & Platforms', icon: GraduationCap, tools: ['LMS Platforms', 'Live Tutoring', 'Skill Courses', 'Certifications'] },
   { category: 'Programming', icon: GitBranch, tools: ['C', 'C++', 'Python (Basic)'] }, // Added Python based on AI context
  { category: 'Mobile Development', icon: Smartphone, tools: ['Dart', 'Flutter (Basic)'] }, // Kept basic mobile
  { category: 'Cybersecurity', icon: Lock, tools: ['Awareness Projects'] },
  { category: 'Game Design (Learning)', icon: Gamepad, tools: ['Voice-Controlled UI'] },
];


export function SkillsSection() {
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionContainer id="skills" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Skills I Offer</h2> {/* Updated title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skillCategory, index) => (
            <Card
                key={index}
                className="glassmorphism group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent hover:scale-[1.02] hover:neon-glow"
            >
                 <CardHeader className="items-center text-center p-4 pb-2"> {/* Centered header */}
                    <skillCategory.icon className="w-10 h-10 mb-2 text-primary transition-colors group-hover:text-accent" />
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{skillCategory.category}</CardTitle>
                 </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-center"> {/* Adjusted padding and centering */}
                 {/* Tools list */}
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

