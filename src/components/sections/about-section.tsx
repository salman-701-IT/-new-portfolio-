
'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, User, Briefcase, Languages, GraduationCap, Zap, BrainCircuit, Fingerprint, Box, Code, Film, Bot, Sparkles, Rocket, Target, Palette, MonitorSmartphone, Lock, Search, BarChart, CheckCircle } from 'lucide-react'; // Added CheckCircle
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
    phone: '+91-9750129532',
    location: 'Chennai, Tamil Nadu, India',
    role: 'Creative Technologist | Full Stack Developer | AI Solutions Architect | Educator | Designer', // Updated role for professionalism
    founder: 'Yumaris Agency',
    languages: 'English, Tamil, Hindi',
    education: 'B.Tech Information Technology (Pursuing), Chennai',
  };

  // Updated expertise for better clarity and impact
   const expertise = [
    { icon: MonitorSmartphone, text: 'Full Stack Web Development (React, Firebase, Next.js)' }, // More specific
    { icon: Bot, text: 'AI & Automation Solutions (Dialogflow, TensorFlow.js)' }, // Added tech examples
    { icon: Film, text: 'Digital Media Production (Video, Graphics)' }, // More professional term
    { icon: Palette, text: 'UI/UX & Brand Design' }, // Combined and more specific
    { icon: GraduationCap, text: 'Technology Education & Mentoring' }, // More descriptive
    { icon: Fingerprint, text: 'Emerging Technologies (Biometrics, IoT, 3D UI)' }, // Grouped related tech
  ];

  // Updated agency focus for professionalism and clarity
   const agencyFocus = [
    { icon: Code, title: 'Web Development', description: 'Crafting dynamic, responsive websites and web applications with modern frameworks.' }, // Refined description
    { icon: Bot, title: 'AI & Automation', description: 'Developing intelligent chatbots, recommendation engines, and process automation.' }, // Refined description
    { icon: Film, title: 'Creative Media', description: 'Producing engaging video content, motion graphics, and digital assets.' }, // Refined description
    { icon: GraduationCap, title: 'Education & Training', description: 'Delivering live tutoring, creating skill-based courses, and building LMS platforms.' }, // Refined description
    { icon: Palette, title: 'Design & Branding', description: 'Designing unique brand identities, marketing materials, and user interfaces.' }, // Refined description
    { icon: Rocket, title: 'Technology Exploration', description: 'Innovating with biometrics, IoT solutions, 3D interfaces, and voice technologies.' }, // Refined description
  ];


  return (
    <SectionContainer id="about" className="py-16 md:py-24">
      <div ref={ref} className={cn('space-y-12 scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
             {/* Placeholder for Avatar */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary neon-glow-primary animate-pulse flex items-center justify-center bg-secondary text-muted-foreground">
                 <Image
                    src="https://picsum.photos/seed/indianavatar/300/300"
                    alt="Salman Khan S. - Creative Technologist" // Updated alt text
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                    data-ai-hint="indian male avatar realistic professional" // Added hint for a suitable image
                 />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold text-glow-primary flex items-center justify-center md:justify-start gap-2"> <Rocket className="w-8 h-8" /> Meet Salman Khan S.</h2>
             <p className="text-lg md:text-xl text-foreground/80 font-semibold">
               Driving Innovation at <span className="text-accent">Yumaris Agency</span>
             </p>
            <p className="text-muted-foreground">
              Founder | Developer | Educator | Designer | AI Architect
            </p>
            <p className="text-foreground/90">
               Based in Chennai, India, I am a versatile Creative Technologist passionate about leveraging web development, AI, digital media, and education to build impactful solutions. My focus is on integrating technology and design to empower businesses, students, and creators worldwide.
            </p>
             <p className="text-muted-foreground">Connect with me: <a href={`mailto:${personalInfo.email}`} className="text-accent hover:underline">{personalInfo.email}</a> | Call: <a href={`tel:${personalInfo.phone}`} className="text-accent hover:underline">{personalInfo.phone}</a></p>
          </div>
        </div>

        {/* Personal Info & Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="glassmorphism hover:border-primary transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-accent"><User /> About Me</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3 text-sm">
               <p className="flex items-center gap-2"><User size={16} /> {personalInfo.fullName}</p>
               <p className="flex items-center gap-2"><Mail size={16} /> <a href={`mailto:${personalInfo.email}`} className="hover:text-accent">{personalInfo.email}</a></p>
               <p className="flex items-center gap-2"><Phone size={16} /> <a href={`tel:${personalInfo.phone}`} className="hover:text-accent">{personalInfo.phone}</a></p>
               <p className="flex items-center gap-2"><MapPin size={16} /> {personalInfo.location}</p>
               <p className="flex items-center gap-2"><Briefcase size={16} /> {personalInfo.role}</p>
               <p className="flex items-center gap-2"><Briefcase size={16} /> Founder, {personalInfo.founder}</p>
               <p className="flex items-center gap-2"><Languages size={16} /> Proficient in: {personalInfo.languages}</p>
               <p className="flex items-center gap-2"><GraduationCap size={16} /> Education: {personalInfo.education}</p>
             </CardContent>
           </Card>

           <Card className="glassmorphism hover:border-accent transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-primary"><Zap /> Core Competencies</CardTitle>
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
             <CardTitle className="flex items-center gap-2 text-accent"><Target /> Yumaris Agency: Services Offered</CardTitle>
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

          {/* Why Work With Me */}
         <Card className="glassmorphism hover:border-accent transition-colors">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-primary"><Sparkles /> The Yumaris Advantage</CardTitle>
           </CardHeader>
           <CardContent className="space-y-3">
             <p className="text-foreground/90 flex items-start gap-2">
                <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0"/> I integrate <span className="font-semibold text-accent">innovation, affordability, and dedicated partnership</span> into every project.
             </p>
             <p className="text-foreground/90 flex items-start gap-2">
                <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0"/> Whether you require a sophisticated website, captivating media, intelligent AI systems, or effective educational platforms, Yumaris Agency delivers results that are both aesthetically pleasing and functionally robust.
             </p>
           </CardContent>
         </Card>

      </div>
    </SectionContainer>
  );
}

