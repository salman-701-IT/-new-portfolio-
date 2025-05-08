'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, User, Briefcase, Languages, GraduationCap, Zap, BrainCircuit, Fingerprint, Box, Code, Film, Bot, Sparkles, Rocket, Target, Palette, MonitorSmartphone, Lock, Search, BarChart, CheckCircle, Eye, Award, Trophy, Code2, Cpu, Smartphone, Gamepad2, Headset, Lightbulb, Leaf, Video, Laptop2, Layers3, Paintbrush, Megaphone, Shield } from 'lucide-react';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Import Badge

export function AboutSection() {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    threshold: 0.1,
  });

  const personalInfo = {
    fullName: 'Salman Khan S.',
    email: 'salmankhan701.it@gmail.com',
    phone: '+91-9750129532',
    location: 'Chennai, Tamil Nadu, India',
    role: 'Creative Technologist | AI Developer | Founder',
    founder: 'Yumaris Agency',
    languages: 'English, Tamil, Hindi',
    education: 'B.Tech Information Technology (Pursuing)',
  };

  const specializations = [
    { icon: BrainCircuit, text: 'AI Solutions (Liveness detection, recommendation systems, automation)' },
    { icon: Code2, text: 'Web Design & Full-Stack Development (React, Firebase, Tailwind, SEO)' },
    { icon: Smartphone, text: 'App Development (Flutter, Firebase, cross-platform solutions)' },
    { icon: Cpu, text: 'Embedded Tech & IoT (Arduino, ESP32, Smart Campus systems)' },
    { icon: Headset, text: 'Voice-Controlled Tools (Gamified learning and accessibility)' },
    { icon: Lightbulb, text: 'EdTech Platforms (Skill courses with quizzes, certification, dashboards)' },
    { icon: Video, text: 'Video Editing (Social content, motion graphics, branding videos)' },
  ];

  const yumarisServices = [
    { title: 'Education', icon: GraduationCap, details: ['Live tutoring for school students', 'Recorded skill-learning courses with certification', 'AI-based course recommendations'] },
    { title: 'Website Design & Development', icon: Laptop2, details: ['Business and personal websites', 'eCommerce and service portals', 'Digital branding and automation tools'] },
    { title: 'Video Editing & Multimedia', icon: Film, details: ['Event and social media videos', 'Animated explainers, intros, and reels', 'YouTube content for educators and creators'] },
  ];

  const competitionsProjects = [
      { icon: Trophy, text: 'Finalist – CodeCode Hackathon' },
      { icon: Award, text: 'Participant – IIT Bombay Hackathon' },
      { icon: Fingerprint, text: 'Face Liveness Detection system for biometric security' },
      { icon: Leaf, text: 'Green Campus with IoT – Smart automation for colleges' },
      { icon: Gamepad2, text: 'Voice-Controlled Vocational Game – Accessible learning simulation' },
      { icon: Bot, text: 'AI-powered Chatbot for eCommerce (order tracking, product search)' },
      { icon: Layers3, text: '3D animated personal portfolio (React + Tailwind + Three.js)' },
  ];

  const techSkills = [
    { category: 'Languages', skills: ['Python', 'C/C++', 'Dart', 'JavaScript', 'HTML', 'CSS'] },
    { category: 'Frameworks/Tools', skills: ['TensorFlow', 'Flutter', 'Firebase', 'ONNX', 'Arduino IDE', 'React', 'Next.js', 'Tailwind CSS'] },
    { category: 'Platforms', skills: ['Web', 'Android', 'ESP32'] },
    { category: 'Creative Tools', skills: ['Adobe Premiere Pro', 'Canva', 'After Effects'] },
  ];

  const mission = "To empower students, creators, and small businesses by delivering innovative, accessible, and intelligent digital solutions — blending technology, creativity, and education.";
  const vision = "To be a leading force in transforming how people learn, grow, and succeed through AI-powered tools, immersive design, and inclusive technology.";

  return (
    <SectionContainer id="about" className="py-16 md:py-24">
      <div ref={ref} className={cn('space-y-12 scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary neon-glow-primary flex items-center justify-center bg-secondary">
                 <Image src="/salman.png" 
                    alt="Salman Khan S. - Creative Technologist & AI Developer"
                    width={256} // Explicit width, matches md:w-64
                    height={256} // Explicit height, matches md:h-64
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-110"
                    data-ai-hint="avatar portrait Indian man"
                    priority
                 />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left">
             <h2 className="text-3xl md:text-4xl font-bold text-glow-primary flex items-center justify-center md:justify-start gap-2">
                 <Rocket className="w-8 h-8" /> Meet Salman Khan S.
             </h2>
             <p className="text-lg md:text-xl text-foreground/80 font-semibold">
               Creative Technologist, AI Developer, Founder of <span className="text-accent">Yumaris Agency</span>
             </p>
             <p className="text-foreground/90">
                Based in Chennai, India, I build smart, accessible, and immersive digital experiences by blending cutting-edge technology with creative storytelling. I specialize in AI-powered platforms, interactive websites, and skill-based learning systems designed to empower businesses, students, and creators.
            </p>
             <p className="text-muted-foreground">Connect: <a href={`mailto:${personalInfo.email}`} className="text-accent hover:underline">{personalInfo.email}</a> | Call: <a href={`tel:${personalInfo.phone}`} className="text-accent hover:underline">{personalInfo.phone}</a></p>
             <p className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground"><MapPin size={16} /> {personalInfo.location}</p>
              <p className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground"><Languages size={16} /> {personalInfo.languages}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="glassmorphism hover:border-primary transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-primary"><GraduationCap /> Academic Background</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3 text-sm">
               <p className="font-semibold">{personalInfo.education}</p>
               <p className="text-foreground/90">Strong foundation in:</p>
               <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Artificial Intelligence & Machine Learning</li>
                  <li>Human-Computer Interaction</li>
                  <li>Web & Mobile Development</li>
                  <li>Cybersecurity</li>
                  <li>Embedded Systems & IoT</li>
               </ul>
                <p className="text-foreground/90 mt-2">My academic journey complements my passion for solving real-world problems through automation, AI, and design.</p>
             </CardContent>
           </Card>

           <Card className="glassmorphism hover:border-accent transition-colors">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-accent"><Zap /> What I Specialize In</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <p className="text-muted-foreground text-sm">At the intersection of tech, design, and education, I focus on:</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {specializations.map((item, index) => (
                   <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                     <item.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                     <span className="text-xs font-medium text-foreground/90">{item.text}</span>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>

         <Card className="glassmorphism hover:border-primary transition-colors">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-accent"><Briefcase /> Yumaris Agency</CardTitle>
              <p className="text-muted-foreground pt-1">My tech and creative startup offering core services in Education, Web Development, and Multimedia Production. All services are priced affordably and designed to empower students, startups, and small businesses.</p>
           </CardHeader>
           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {yumarisServices.map((service, index) => (
               <div key={index} className="flex flex-col items-center text-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                 <service.icon className="w-8 h-8 mb-3 text-primary" />
                 <h4 className="font-semibold mb-2">{service.title}</h4>
                 <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 text-left pl-4">
                     {service.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                 </ul>
               </div>
             ))}
           </CardContent>
         </Card>

        <Card className="glassmorphism hover:border-accent transition-colors">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><Award /> Competitions &amp; Key Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {competitionsProjects.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-foreground/90 text-sm">
                            <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glassmorphism hover:border-primary transition-colors">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary"><Target /> Mission</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-foreground/90">{mission}</p>
                </CardContent>
            </Card>
             <Card className="glassmorphism hover:border-accent transition-colors">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent"><Eye /> Vision</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-foreground/90">{vision}</p>
                </CardContent>
            </Card>
        </div>

         <Card className="glassmorphism hover:border-primary transition-colors">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-accent"><Code /> Technical Skills</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              {techSkills.map((group, index) => (
                <div key={index}>
                    <h4 className="font-semibold mb-2 text-primary/90">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, skillIndex) => (
                             <Badge key={skillIndex} variant="secondary" className="text-xs font-normal">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
              ))}
           </CardContent>
         </Card>
      </div>
    </SectionContainer>
  );
}
