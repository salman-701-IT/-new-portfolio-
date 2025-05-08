// src/components/sections/about-section.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, User, Briefcase, Languages, GraduationCap, Zap, BrainCircuit, Fingerprint, Box, Code, Film, Bot, Sparkles, Rocket, Target, Palette, MonitorSmartphone, Lock, Search, BarChart, CheckCircle, Eye, Award, Trophy, Code2, Cpu, Smartphone, Gamepad2, Headset, Lightbulb, Leaf, Video, Laptop2, Layers3, Paintbrush, Megaphone, Shield, TrendingUp, ZapIcon, Users, GitBranch, LinkIcon, Settings, Database, Server, Wifi, Bluetooth, Activity, Wand2, BookOpen, Building, Globe } from 'lucide-react';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


// Define the structure for content sections
interface ContentSection {
  title: string;
  icon: React.ElementType;
  items: string[] | { heading: string; points: string[] }[];
  color?: string; // Optional color for card/icon
}


const aboutData = {
  personalIntro: {
    greeting: "Hello there! I'm",
    name: "Salman Khan S.",
    tagline: "Creative Technologist, AI Developer, & Founder of Yumaris Agency",
    location: "Chennai, India",
    summary: "A dynamic and innovative technologist with a flair for creative problem-solving. I specialize in crafting intelligent, user-centric digital experiences that seamlessly integrate cutting-edge technology with compelling storytelling. My work spans AI-driven platforms, interactive web and mobile applications, and transformative educational systems. I am dedicated to pushing the boundaries of what's possible to deliver impactful solutions.",
    profileImage: "/salman.png", // Path to image in public folder
  },
  academicBackground: {
    title: "Academic Background",
    icon: GraduationCap,
    degree: "Bachelor of Technology in Information Technology (Pursuing)",
    focusAreas: [
        "Artificial Intelligence & Machine Learning (Deep Learning, NLP)", 
        "Human-Computer Interaction (UI/UX Design Principles)", 
        "Web & Mobile Development (Full-Stack, Cross-Platform)", 
        "Cybersecurity (Network Security, Ethical Hacking concepts)", 
        "Embedded Systems & IoT (Microcontroller Programming, Sensor Integration)",
        "Data Structures & Algorithms",
        "Database Management Systems"
    ],
    description: "My academic journey is intensely focused on harnessing technology to solve complex, real-world challenges through innovative automation, intelligent systems, and user-first design principles. I am constantly exploring new paradigms in tech.",
  },
  specializations: [
    { title: "AI Solutions Development", icon: BrainCircuit, details: "Expert in Liveness detection, advanced recommendation systems, and sophisticated automation tools, leveraging models like TensorFlow & ONNX.", color: "text-sky-400" },
    { title: "Web Design & Full-Stack Development", icon: Code2, details: "Proficient in React, Next.js, Firebase, and Tailwind CSS, focusing on SEO-friendly, high-performance, and scalable web applications.", color: "text-emerald-400" },
    { title: "Cross-Platform App Development", icon: Smartphone, details: "Building native-like experiences on iOS and Android using Flutter and Firebase, ensuring wide accessibility and robust functionality.", color: "text-blue-400" },
    { title: "Embedded Technology & IoT Systems", icon: Cpu, details: "Specializing in Arduino and ESP32 for Smart Campus solutions, sensor networks, and real-time data processing applications.", color: "text-orange-400" },
    { title: "Voice-Controlled & Interactive Tools", icon: Headset, details: "Creating gamified learning environments and accessibility tools using voice recognition and interactive simulations.", color: "text-purple-400" },
    { title: "EdTech Platform Engineering", icon: BookOpen, details: "Developing comprehensive skill-based online courses featuring interactive quizzes, automated certification, and user-friendly dashboards.", color: "text-yellow-400" },
    { title: "Multimedia Production & Video Editing", icon: Film, details: "Producing engaging social media content, professional motion graphics, and compelling branding videos for diverse audiences.", color: "text-red-400" },
  ],
  yumarisAgency: {
    title: "Yumaris Agency - Innovation Hub",
    icon: Building,
    tagline: "My tech and creative startup, delivering excellence across three core service pillars:",
    services: [
      { name: "Next-Gen Education Services", icon: GraduationCap, items: ["Personalized live tutoring for K-12 students, enhancing academic performance.", "Curated recorded skill-learning courses with industry-recognized certification.", "AI-driven course recommendation engine for tailored learning paths."] },
      { name: "Digital Presence & Web Solutions", icon: Laptop2, items: ["Custom business and personal website design & development with a focus on UI/UX.", "Scalable eCommerce platforms and dynamic service portals with integrated payment gateways.", "Comprehensive digital branding, content strategy, and marketing automation tools."] },
      { name: "Creative Multimedia & Video Production", icon: Video, items: ["High-impact event coverage and engaging social media video content (Reels, Shorts).", "Professional animated explainer videos, dynamic intros/outros, and motion graphics.", "Full-service YouTube content creation for educators, influencers, and corporate clients."] },
    ],
    footer: "All Yumaris services are meticulously crafted to be affordable and strategically designed to empower students, startups, and small to medium-sized businesses to thrive in the digital age."
  },
  competitionsAndProjects: {
      title: "Key Competitions & Project Highlights",
      icon: Trophy,
      items: [
        { name: "Finalist – CodeCode Hackathon (Showcased innovative AI solution)", icon: Award },
        { name: "Active Participant – IIT Bombay National Hackathon (Developed IoT prototype)", icon: Award },
        { name: "Advanced Face Liveness Detection system for enhanced biometric security protocols", icon: Fingerprint },
        { name: "Eco-Friendly Green Campus Automation using IoT – Smart energy and resource management for educational institutions", icon: Leaf },
        { name: "Accessible Voice-Controlled Vocational Training Game – Simulating real-world job tasks for inclusive learning", icon: Gamepad2 },
        { name: "Intelligent AI-powered Chatbot for E-commerce with order tracking and personalized support", icon: Bot },
        { name: "Dynamic 3D Animated Personal Portfolio (React, Tailwind CSS, Three.js) showcasing interactive UI/UX", icon: Layers3, projectLink:"/#projects" },
      ]
  },
  missionVision: [
      {
        title: "Mission",
        icon: Target,
        text: "To empower students, creators, and small businesses by delivering innovative, accessible, and intelligent digital solutions — blending technology, creativity, and education to foster growth and success.",
        color: "text-primary"
      },
      {
        title: "Vision",
        icon: Eye,
        text: "To be a leading global force in transforming how individuals and organizations learn, innovate, and achieve their full potential through AI-powered tools, immersive digital experiences, and inclusive technology.",
        color: "text-accent"
      }
  ],
  technicalSkills: {
    title: "Core Technical Proficiency",
    icon: Settings,
    categories: [
      { name: "Programming Languages", items: ["Python (Advanced)", "C/C++ (Proficient)", "Dart (Flutter)", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"], icon: Code },
      { name: "Frameworks & Libraries", items: ["TensorFlow", "Keras", "Flutter", "Firebase Suite", "ONNX", "Arduino IDE", "React", "Next.js", "Node.js", "Express.js", "Tailwind CSS"], icon: Box },
      { name: "Development Platforms", items: ["Web (Frontend & Backend)", "Android (Native & Cross-Platform)", "ESP32 Microcontrollers", "Cloud Platforms (Firebase, basic AWS/GCP)"], icon: MonitorSmartphone },
      { name: "Creative & Design Tools", items: ["Adobe Premiere Pro (Expert)", "Adobe After Effects (Intermediate)", "Canva (Advanced)", "Figma (UI/UX Design)", "Blender (Basic 3D Modeling)"], icon: Palette },
    ]
  },
  contactPrompt: {
    text: "Inspired to collaborate or eager to learn more about my work? Let's connect and explore the possibilities.",
    buttonText: "Start a Conversation",
    icon: Mail,
    email: "salmankhan701.it@gmail.com"
  }
};


export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    // You can return a placeholder/skeleton here if needed
    return (
        <SectionContainer id="about" className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                 <div className="md:col-span-1 flex justify-center">
                     <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary neon-glow-primary flex items-center justify-center bg-secondary text-muted-foreground animate-pulse">
                        <User className="w-24 h-24 text-primary/50" />
                    </div>
                 </div>
                <div className="md:col-span-2 space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                </div>
            </div>
        </SectionContainer>
    );
  }


  return (
    <SectionContainer id="about" className="py-16 md:py-24">
      <div ref={ref} className={cn('transition-all duration-1000 ease-out', inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm')}>
        {/* Main Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
          <div className="lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left group">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary neon-glow-primary shadow-2xl mb-6 transform transition-all duration-500 group-hover:scale-105">
              <Image
                src={aboutData.personalIntro.profileImage}
                alt={`${aboutData.personalIntro.name} - Creative Technologist & AI Developer`}
                width={300}
                height={300}
                className="rounded-full object-cover aspect-square"
                priority
                data-ai-hint="professional portrait"
              />
               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500"/>
            </div>
            <p className="text-lg text-muted-foreground">{aboutData.personalIntro.greeting}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow-primary mb-1">{aboutData.personalIntro.name}</h1>
            <p className="text-xl text-accent font-medium mb-2">{aboutData.personalIntro.tagline}</p>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              {aboutData.personalIntro.location}
            </div>
            <p className="text-foreground/80 leading-relaxed">{aboutData.personalIntro.summary}</p>
          </div>

          {/* Mission and Vision Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutData.missionVision.map((item, index) => (
              <Card key={index} className="glassmorphism hover:border-primary/70 hover:shadow-xl transition-all duration-300 group flex flex-col">
                <CardHeader className="items-center text-center">
                  <item.icon className={`w-12 h-12 mb-3 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
                  <CardTitle className={`text-2xl ${item.color} text-glow`}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-foreground/80 flex-grow">
                  <p>{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Accordion for other sections */}
        <Accordion type="single" collapsible className="w-full space-y-6">
          {/* Academic Background */}
          <AccordionItem value="academic-background" className="glassmorphism border-none rounded-lg overflow-hidden hover:border-accent/50 transition-shadow hover:shadow-lg">
            <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline text-accent hover:bg-accent/10 transition-colors">
              <div className="flex items-center">
                <aboutData.academicBackground.icon className="w-6 h-6 mr-3 text-accent" />
                {aboutData.academicBackground.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <p className="text-lg font-medium text-foreground mb-2">{aboutData.academicBackground.degree}</p>
              <h4 className="text-md font-semibold text-primary mb-1">Focus Areas:</h4>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 mb-3">
                {aboutData.academicBackground.focusAreas.map((area, i) => <li key={i}>{area}</li>)}
              </ul>
              <p className="text-foreground/80">{aboutData.academicBackground.description}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Specializations */}
          <AccordionItem value="specializations" className="glassmorphism border-none rounded-lg overflow-hidden hover:border-primary/50 transition-shadow hover:shadow-lg">
            <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline text-primary hover:bg-primary/10 transition-colors">
               <div className="flex items-center">
                <Rocket className="w-6 h-6 mr-3 text-primary" /> {/* Generic Icon for Trigger */}
                Key Specializations
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutData.specializations.map((spec, i) => (
                  <Card key={i} className="bg-card/50 border-border/50 group hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                      <spec.icon className={`w-6 h-6 ${spec.color || 'text-primary'}`} />
                      <CardTitle className="text-md font-medium">{spec.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {spec.details}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Yumaris Agency */}
          <AccordionItem value="yumaris-agency" className="glassmorphism border-none rounded-lg overflow-hidden hover:border-accent/50 transition-shadow hover:shadow-lg">
            <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline text-accent hover:bg-accent/10 transition-colors">
              <div className="flex items-center">
                <aboutData.yumarisAgency.icon className="w-6 h-6 mr-3 text-accent" />
                {aboutData.yumarisAgency.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <p className="text-lg text-muted-foreground mb-4">{aboutData.yumarisAgency.tagline}</p>
              <div className="space-y-6">
                {aboutData.yumarisAgency.services.map((service, i) => (
                  <div key={i}>
                    <h4 className="flex items-center text-md font-semibold text-foreground mb-2">
                      <service.icon className="w-5 h-5 mr-2 text-primary" />
                      {service.name}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-2">
                      {service.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground italic">{aboutData.yumarisAgency.footer}</p>
            </AccordionContent>
          </AccordionItem>

          {/* Competitions & Projects */}
           <AccordionItem value="competitions-projects" className="glassmorphism border-none rounded-lg overflow-hidden hover:border-primary/50 transition-shadow hover:shadow-lg">
            <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline text-primary hover:bg-primary/10 transition-colors">
              <div className="flex items-center">
                 <aboutData.competitionsAndProjects.icon className="w-6 h-6 mr-3 text-primary" />
                {aboutData.competitionsAndProjects.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
                <ul className="space-y-3">
                    {aboutData.competitionsAndProjects.items.map((item, i) => (
                        <li key={i} className="flex items-center text-foreground/90 group">
                           <item.icon className="w-5 h-5 mr-3 text-accent flex-shrink-0 group-hover:scale-110 transition-transform"/>
                           <span>
                               {item.name}
                               {item.projectLink && (
                                   <a href={item.projectLink} className="ml-2 text-primary hover:underline text-sm">(View Project)</a>
                               )}
                           </span>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Technical Skills */}
           <AccordionItem value="technical-skills" className="glassmorphism border-none rounded-lg overflow-hidden hover:border-accent/50 transition-shadow hover:shadow-lg">
            <AccordionTrigger className="p-6 text-xl font-semibold hover:no-underline text-accent hover:bg-accent/10 transition-colors">
              <div className="flex items-center">
                <aboutData.technicalSkills.icon className="w-6 h-6 mr-3 text-accent" />
                 {aboutData.technicalSkills.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-0">
              <div className="space-y-4">
                {aboutData.technicalSkills.categories.map((category, i) => (
                  <div key={i}>
                    <h4 className="flex items-center text-md font-semibold text-foreground mb-2">
                        <category.icon className="w-5 h-5 mr-2 text-primary" />
                        {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, j) => (
                        <span key={j} className="px-3 py-1 text-xs font-medium bg-secondary rounded-full text-muted-foreground">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Prompt */}
        <Card className="mt-16 glassmorphism text-center p-8 md:p-12 border-primary neon-glow-primary">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <aboutData.contactPrompt.icon className="w-12 h-12 text-primary text-glow-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-primary">{aboutData.contactPrompt.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button size="lg" asChild className="group neon-glow hover:shadow-[0_0_25px_theme(colors.primary),0_0_40px_theme(colors.primary)] transition-shadow duration-300">
              <a href={`mailto:${aboutData.contactPrompt.email}?subject=Project Inquiry from Portfolio`}>
                {aboutData.contactPrompt.buttonText}
                <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:scale-125 group-hover:animate-pulse" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
}
