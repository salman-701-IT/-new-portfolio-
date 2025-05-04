'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, User, Briefcase, Languages, GraduationCap, Zap, BrainCircuit, Fingerprint, Box, Code, Film, Bot, Sparkles, Rocket, Target, Palette, MonitorSmartphone, Lock, Search, BarChart } from 'lucide-react'; // Added more icons
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
    role: 'Creative Technologist | Founder | Developer | Educator | Designer | AI Enthusiast', // Updated role
    founder: 'Yumaris Agency',
    languages: 'English, Tamil, Hindi',
    education: 'B.Tech Information Technology (Pursuing), Chennai',
  };

  // Updated expertise based on text
   const expertise = [
    { icon: MonitorSmartphone, text: 'Web Development (React, Firebase)' },
    { icon: Bot, text: 'AI Automation & Chatbots' },
    { icon: Film, text: 'Video Editing & Creative Content' },
    { icon: Palette, text: 'Design & Branding' },
    { icon: GraduationCap, text: 'Education & Mentoring' },
    { icon: Fingerprint, text: 'Futuristic Tech (Biometrics, IoT)' },
  ];

  // Updated agency focus based on text
   const agencyFocus = [
    { icon: Code, title: 'Web Development', description: 'Stunning, responsive websites using React, Tailwind CSS, Firebase.' },
    { icon: Bot, title: 'AI & Automation', description: 'Intelligent Dialogflow chatbots, course recommenders, business automation.' },
    { icon: Film, title: 'Creative Media', description: 'Video editing (YouTube, reels), motion graphics, engaging content.' },
    { icon: GraduationCap, title: 'Education & Training', description: 'Live tutoring, recorded skill courses, LMS platforms, certifications.' },
    { icon: Palette, title: 'Design & Branding', description: 'Custom branding, posters, digital content, SEO, digital marketing.' },
    { icon: Rocket, title: 'Futuristic Tech', description: 'Exploring face liveness, embedded systems (ESP32/IoT), 3D UI, voice interfaces.' },
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
                    data-ai-hint="professional avatar futuristic" // Updated hint
                 />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold text-glow-primary flex items-center justify-center md:justify-start gap-2"> <Rocket className="w-8 h-8" /> Meet Salman Khan S.</h2>
             <p className="text-lg md:text-xl text-foreground/80 font-semibold">
               The Creative Technologist Behind <span className="text-accent">Yumaris Agency</span>
             </p>
            <p className="text-muted-foreground">
              Founder | Developer | Educator | Designer | AI Enthusiast
            </p>
            <p className="text-foreground/90">
               I’m a passionate and multi-talented creator from Chennai, India, building the future through web design, AI-powered solutions, creative media, and education. I specialize in blending technology, design, and automation to solve real-world problems and help businesses, students, and creators grow.
            </p>
             <p className="text-muted-foreground">Reach me at: <a href={`mailto:${personalInfo.email}`} className="text-accent hover:underline">{personalInfo.email}</a> or Call: <a href={`tel:${personalInfo.phone}`} className="text-accent hover:underline">{personalInfo.phone}</a></p>
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
               <p className="flex items-center gap-2"><Phone size={16} /> <a href={`tel:${personalInfo.phone}`} className="hover:text-accent">{personalInfo.phone}</a></p>
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
             <CardTitle className="flex items-center gap-2 text-accent"><Target /> Yumaris Agency: What I Do</CardTitle>
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
             <CardTitle className="flex items-center gap-2 text-primary"><Sparkles /> Why Work With Me?</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-foreground/90">
                I bring <span className="font-semibold text-accent">innovation, affordability, and heart</span> into everything I build. Whether you need a branded website, a creative video, a smart AI system, or engaging educational tools, Yumaris Agency is here to make it happen — beautifully and effectively.
             </p>
           </CardContent>
         </Card>

      </div>
    </SectionContainer>
  );
}
