'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import SectionContainer from '../section-container';
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch, Film, Search, BarChart, Lock, GraduationCap, Box, Paintbrush, MonitorSmartphone, Router, Cpu, Hand, Wifi, Bluetooth, Activity, Wand2, Award, Layers3d, Gamepad2, Megaphone, Target, Share2, MessageSquare, ShieldCheck, Shield, Puzzle, Brain, Clock, Mic, Languages, Link, Cube, ShoppingCart } from 'lucide-react'; // Added more relevant icons
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Updated skills array based on the user's detailed input
const skills = [
  { category: 'Web & App Development', icon: MonitorSmartphone, tools: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Firebase (Hosting, Auth, Realtime DB)', 'Responsive Web Design', 'E-commerce Websites', 'SEO Optimization'] },
  { category: 'Artificial Intelligence & Automation', icon: BrainCircuit, tools: ['TensorFlow.js', 'ONNX', 'AI Chatbots (Dialogflow)', 'Face Liveness Detection', 'AI Course Recommenders', 'Automated Email & Response Systems'] },
  { category: 'Embedded Systems & IoT', icon: Cpu, tools: ['Arduino', 'ESP32', 'C', 'C++', 'Flex Sensor Integration', 'Wi-Fi & Bluetooth', 'Real-time Sensor Data Handling'] },
  { category: 'Design & Multimedia', icon: Palette, tools: ['Video Editing (YouTube, Reels, Events)', 'Motion Graphics', 'Visual Effects', 'Adobe Premiere Pro', 'Canva', 'Branding Design (Logo, Poster)', 'UI/UX Design', '3D Web Interface Design'] },
  { category: 'Educational & LMS Development', icon: GraduationCap, tools: ['Live Tutoring Setup', 'Course Recording & Publishing', 'Skill-Based LMS', 'Certification', 'Gamified Learning', 'Educational Chatbots'] },
  { category: 'Marketing & Branding', icon: Megaphone, tools: ['Social Media Marketing (Instagram, LinkedIn, YouTube)', 'Google Ads', 'Meta Ads', 'Email, SMS, WhatsApp Marketing', 'Content Marketing', 'Reputation Management'] },
  { category: 'Cybersecurity & Biometric Projects', icon: Shield, tools: ['Basic Cybersecurity Principles', 'Biometric Authentication', 'Face Detection', 'Anti-Spoofing Systems'] },
  { category: 'Other Skills', icon: Puzzle, tools: ['Time & Project Management', 'Voice-Controlled Game Dev', 'Multilingual (English, Tamil, Hindi)', 'Blockchain (Learning)'] },
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
