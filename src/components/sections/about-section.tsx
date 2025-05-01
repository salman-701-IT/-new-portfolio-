'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, User, Briefcase, Languages, GraduationCap, Zap, BrainCircuit, Fingerprint, Box, Code, Film, Bot, Sparkles } from 'lucide-react';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const personalInfo = {
    fullName: 'Salman Khan S.',
    email: 'salmankhan701.it@email.com',
    phone: '+91-6381542362',
    location: 'Chennai, Tamil Nadu, India',
    role: 'Creative Technologist, Developer, Designer, Video Editor',
    founder: 'Yumaris Agency',
    languages: 'English, Tamil, Hindi',
    education: 'B.Tech Information Technology (Pursuing), Chennai',
  };

  const expertise = [
    { icon: Box, text: '3D UI' },
    { icon: BrainCircuit, text: 'AI integration' },
    { icon: Fingerprint, text: 'Biometric security' },
    { icon: Sparkles, text: 'Immersive web' },
    { icon: Code, text: 'No-code platforms' },
  ];

  const agencyFocus = [
    { icon: GraduationCap, title: 'Education', description: 'Live tutoring, skill courses, student development.' },
    { icon: Code, title: 'Website Design', description: 'Business sites, e-commerce, digital marketing, SEO.' },
    { icon: Film, title: 'Multimedia', description: 'Video editing (YouTube, social media), motion graphics.' },
    { icon: Bot, title: 'AI Automation', description: 'Chatbots, recommendation systems, email handlers.' },
    { icon: Sparkles, title: 'Accessibility & Innovation', description: 'Voice interfaces, gamified learning, inclusive experiences.' },
  ];


  return (
    <SectionContainer id="about" className="py-16 md:py-24">
      <div ref={ref} className={cn('space-y-12 scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
             {/* Placeholder for 3D Avatar - using Next/Image for now */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary neon-glow-primary animate-pulse">
                 <Image
                    src="https://picsum.photos/300/300"
                    alt="Salman Khan Avatar"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                    data-ai-hint="professional avatar"
                 />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-glow-primary">About Me</h2>
            <p className="text-lg md:text-xl text-foreground/80">
              Hi, I&apos;m <span className="text-accent font-semibold">Salman Khan</span>, a passionate developer and creative technologist specializing in 3D UI, AI integration, and immersive web experiences.
            </p>
            <p className="text-muted-foreground">
              I focus on building interactive, accessible, and futuristic websites that blend creativity with cutting-edge technology. Founder of Yumaris Agency, based in Chennai, India.
            </p>
             <p className="text-muted-foreground">Reach me at: <a href={`mailto:${personalInfo.email}`} className="text-accent hover:underline">{personalInfo.email}</a></p>
          </div>
        </div>

        {/* Personal Info & Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="glassmorphism hover:border-primary transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-accent"><User /> Personal Info</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3 text-sm">
               <p className="flex items-center gap-2"><User size={16} /> {personalInfo.fullName}</p>
               <p className="flex items-center gap-2"><Mail size={16} /> <a href={`mailto:${personalInfo.email}`} className="hover:text-accent">{personalInfo.email}</a></p>
               <p className="flex items-center gap-2"><Phone size={16} /> {personalInfo.phone}</p>
               <p className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</p>
               <p className="flex items-center gap-2"><Briefcase size={16} /> {personalInfo.role}</p>
               <p className="flex items-center gap-2"><Briefcase size={16} /> Founder of {personalInfo.founder}</p>
               <p className="flex items-center gap-2"><Languages size={16} /> {personalInfo.languages}</p>
               <p className="flex items-center gap-2"><GraduationCap size={16} /> {personalInfo.education}</p>
             </CardContent>
           </Card>

           <Card className="glassmorphism hover:border-accent transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-primary"><Zap /> Core Expertise</CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {expertise.map((item, index) => (
                 <div key={index} className="flex flex-col items-center text-center p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                   <item.icon className="w-8 h-8 mb-2 text-accent" />
                   <span className="text-xs font-medium">{item.text}</span>
                 </div>
               ))}
             </CardContent>
           </Card>
         </div>

        {/* Yumaris Agency Focus */}
         <Card className="glassmorphism hover:border-primary transition-colors">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-accent"><Briefcase /> Yumaris Agency Focus Areas</CardTitle>
           </CardHeader>
           <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {agencyFocus.map((focus, index) => (
               <div key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                 <focus.icon className="w-6 h-6 mt-1 text-primary flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold mb-1">{focus.title}</h4>
                   <p className="text-xs text-muted-foreground">{focus.description}</p>
                 </div>
               </div>
             ))}
           </CardContent>
         </Card>

      </div>
    </SectionContainer>
  );
}
