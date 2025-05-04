'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import SectionContainer from '../section-container';
import { Code, Smartphone, Database, BrainCircuit, Figma, Bot, Gamepad, Fingerprint, Settings, Palette, Tv, GitBranch, Film, Search, BarChart, Lock, GraduationCap, Box, Paintbrush, MonitorSmartphone, Router, Cpu, Hand, Wifi, Bluetooth, Activity, Wand2, Award, Layers3d, Gamepad2, Megaphone, Target, Share2, MessageSquare, ShieldCheck, Shield, Puzzle, Brain, Clock, Mic, Languages, Link, Cube, ShoppingCart, Server } from 'lucide-react'; // Added Server icon
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Updated skills array based on the user's detailed input
const skills = [
  { category: 'Web & App Development', icon: MonitorSmartphone, tools: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Next.js', 'Firebase (Hosting, Auth, Realtime DB, Firestore)', 'Responsive Design', 'E-commerce', 'SEO'] }, // Added Next.js, Firestore, specific terms
  { category: 'AI & Automation', icon: BrainCircuit, tools: ['TensorFlow.js', 'ONNX', 'Dialogflow Chatbots', 'Face Liveness Detection', 'AI Course Recommenders', 'Email Automation', 'Process Automation'] }, // Made terms more specific
  { category: 'Embedded Systems & IoT', icon: Cpu, tools: ['Arduino', 'ESP32', 'C', 'C++', 'Flex Sensors', 'Wi-Fi/Bluetooth', 'Real-time Data', 'IoT Platforms'] }, // More specific terms
  { category: 'Design & Multimedia', icon: Palette, tools: ['Video Editing (YouTube, Reels)', 'Motion Graphics', 'VFX', 'Adobe Premiere Pro', 'Canva', 'Brand Identity', 'UI/UX Design', '3D Web UI'] }, // Specified types, more professional terms
  { category: 'Education & LMS', icon: GraduationCap, tools: ['Live Tutoring', 'Course Creation', 'LMS Platforms', 'Certification Systems', 'Gamification', 'Educational AI Tools'] }, // More professional terms
  { category: 'Marketing & Branding', icon: Megaphone, tools: ['Social Media Marketing', 'Google Ads', 'Meta Ads', 'Direct Marketing (Email, SMS, WhatsApp)', 'Content Strategy', 'Reputation Management'] }, // More professional terms
  { category: 'Security & Biometrics', icon: Shield, tools: ['Cybersecurity Fundamentals', 'Biometric Authentication', 'Face Detection', 'Anti-Spoofing', 'Secure Development Practices'] }, // Added secure dev practices
  { category: 'Additional Skills', icon: Puzzle, tools: ['Project Management', 'Voice Interfaces', 'Multilingual (English, Tamil, Hindi)', 'Blockchain (Learning)', 'API Integration', 'Server Management'] }, // Added API Integration, Server Management
];


export function SkillsSection() {
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionContainer id="skills" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Core Technical Skills</h2> {/* Updated title */}
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
