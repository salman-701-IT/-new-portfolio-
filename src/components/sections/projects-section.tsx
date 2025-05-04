'use client';

import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Eye, Gamepad2, Video, Tv, Award, CircuitBoard, Bot, Loader2, ScanFace, MessageCircle, Headset, Lightbulb, Leaf, PlugZap, Laptop2 } from 'lucide-react'; // Added Loader2
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getProjects } from '@/lib/firebase/firestore'; // Import Firebase function
import type { Project } from '@/types/project'; // Import Project type
import * as LucideIcons from 'lucide-react'; // Import all icons for dynamic rendering


// Helper function to get Lucide icon component by name
const getIconComponent = (iconName: string | React.ElementType): React.ElementType => {
  if (typeof iconName === 'function') {
    return iconName; // Already a component
  }
  // Fallback icon if the requested one doesn't exist
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
  return IconComponent;
};


const mailtoBase = 'mailto:salmankhan701.it@gmail.com'; // Updated base email


const projectsData = [
    {
      id: 'face-liveness',
      title: 'Face Liveness Detection System',
      icon: ScanFace,
      description: "An AI-powered system that detects whether a face is real or spoofed using webcam input. Enhances biometric authentication using live detection algorithms.",
      image: 'https://picsum.photos/seed/facedetect/400/300',
      aiHint: 'face liveness detection interface',
      tech: ['Python', 'TensorFlow.js', 'ONNX', 'OpenCV'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '▶️ Try Live Demo',
      button2Text: '📄 Case Study',
      category: ['AI', 'Security'],
    },
    {
      id: 'ai-ecommerce-chatbot',
      title: 'AI Chatbot with E-Commerce Support',
      icon: MessageCircle,
      description: "Built a smart chatbot using Dialogflow that handles orders, responds to user queries, and tracks deliveries with contextual understanding.",
      image: 'https://picsum.photos/seed/ecommercebot/400/300',
      aiHint: 'chatbot interface gradient',
      tech: ['Dialogflow', 'JS', 'Firebase'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '💬 Chat Demo',
      button2Text: '🔍 See Flow',
      category: ['AI', 'Web'],
    },
    {
      id: 'voice-vocational-game',
      title: 'Voice-Controlled Vocational Game',
      icon: Headset,
      description: "Designed a gamified simulation where learners perform skill tasks using only their voice — ideal for inclusive vocational education.",
      image: 'https://picsum.photos/seed/voicegame/400/300',
      aiHint: 'vocational game interface',
      tech: ['JS', 'Web Speech API', 'Canvas'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '🎮 Play Preview',
      button2Text: '📚 Learn More',
      category: ['Games', 'Education'],
    },
    {
      id: 'yumaris-lms',
      title: 'Yumaris Skill Learning LMS',
      icon: Lightbulb,
      description: "A custom learning platform offering recorded skill courses, auto quizzes, and downloadable certification — powered by Firebase.",
      image: 'https://picsum.photos/seed/yumarislms/400/300',
      aiHint: 'lms dashboard interface',
      tech: ['HTML/CSS/JS', 'Firebase', 'PDFGen'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '📘 Try Sample Course',
      button2Text: '📥 Download Cert',
      category: ['Web', 'Education'],
    },
    {
      id: 'iot-green-campus',
      title: 'IoT Green Campus Automation',
      icon: Leaf,
      description: "An IoT solution to monitor campus energy and environment using real-time sensors (water, CO₂, light) and control appliances wirelessly.",
      image: 'https://picsum.photos/seed/iotcampus/400/300',
      aiHint: 'iot campus dashboard',
      tech: ['ESP32', 'Arduino', 'Wi-Fi', 'Sensors'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '🌱 View Sensor Demo',
      button2Text: '🔌 See Wiring',
      category: ['IoT', 'AI'],
    },
    {
      id: 'multimedia-portfolio',
      title: 'Multimedia Editing Portfolio',
      icon: Video,
      description: "A showcase of YouTube intros, reels, event edits, and logo animations done for brands and influencers under Yumaris Media Services.",
      image: 'https://picsum.photos/seed/multimediaportfolio/400/300',
      aiHint: 'video editing timeline interface',
      tech: ['Premiere Pro', 'Canva', 'After Effects'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '🎥 Watch Reels',
      button2Text: '🎨 View Designs',
      category: ['Media'],
    },
    {
      id: 'client-websites',
      title: 'Client Websites by Yumaris',
      icon: Laptop2,
      description: "Modern, fast-loading websites built for businesses with mobile-friendly designs and SEO optimization — using Firebase & React.",
      image: 'https://picsum.photos/seed/clientwebsites/400/300',
      aiHint: 'website design showcase',
      tech: ['React', 'Tailwind', 'Firebase'],
      demoLink: '#',
      learnMoreLink: '#',
      button1Text: '🌐 Visit Site',
      button2Text: '📄 View Portfolio',
      category: ['Web'],
    },
  ];


export function ProjectsSection() {
 const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

  // State for projects, loading, and error
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Replace Firebase fetch with static data
    setIsLoading(false);
    setProjects(projectsData as Project[]); // Use your defined projects array

  }, []); // Fetch projects on component mount


  return (
    <SectionContainer id="projects" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Showcase</h2>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center h-60">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            )}

             {/* Error State */}
            {error && !isLoading && (
                 <div className="text-center text-destructive bg-destructive/10 p-4 rounded-md">
                    <p>{error}</p>
                 </div>
            )}

             {/* No Projects State */}
            {!isLoading && !error && projects.length === 0 && (
                 <p className="text-center text-muted-foreground">No projects available at the moment.</p>
            )}


            {/* Projects Grid */}
            {!isLoading && !error && projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => {
                    //const IconComponent = getIconComponent(project.icon); // Get the icon component
                    const IconComponent = project.icon as React.ElementType; // Ensure correct type assertion

                    return (
                      <Card
                          key={project.id}
                          className={cn(
                              "glassmorphism group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary hover:scale-[1.03]",
                              "hover:-translate-y-1 hover:shadow-primary/30"
                          )}
                          style={{ animationDelay: `${index * 0.1}s` }}
                      >
                          <CardHeader className="p-0 relative">
                              <div className="absolute top-4 right-4 z-10 p-2 bg-primary/80 rounded-full backdrop-blur-sm neon-glow-primary scale-90 group-hover:scale-100 transition-transform duration-300">
                                 {/* Render the dynamic icon component */}
                                 <IconComponent className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="relative w-full h-48 overflow-hidden">
                                  <Image
                                  src={project.image || 'https://picsum.photos/seed/placeholder/400/300'} // Fallback image
                                  alt={project.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-transform duration-500 group-hover:scale-110"
                                  data-ai-hint={project.aiHint}
                                  />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300" />
                               {/* Removed specific animation overlays for simplicity with dynamic data */}
                              </div>
                          </CardHeader>
                          <CardContent className="p-5 flex-grow flex flex-col">
                              <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                              <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                  {project.tech.map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="secondary" className="text-xs font-normal group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                      {tech}
                                  </Badge>
                                  ))}
                              </div>
                          </CardContent>
                          <CardFooter className="p-5 pt-0 flex gap-3">
                               {/* Button 1 (Demo or Primary Action) */}
                               <Button variant="outline" size="sm" className="flex-1 group/button hover:bg-primary hover:text-primary-foreground hover:border-primary" asChild>
                                   <a href={project.demoLink || `${mailtoBase}?subject=Demo%20Request:%20${encodeURIComponent(project.title)}`} target={project.demoLink && project.demoLink !== '#' ? '_blank' : '_self'} rel="noopener noreferrer">
                                      {project.button1Text || 'View Demo'} <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                                   </a>
                               </Button>
                               {/* Button 2 (Learn More or Secondary Action) */}
                               <Button variant="ghost" size="sm" className="flex-1 group/button text-muted-foreground hover:bg-accent/10 hover:text-accent" asChild>
                                   <a href={project.learnMoreLink || `${mailtoBase}?subject=Inquiry:%20${encodeURIComponent(project.title)}`} target={project.learnMoreLink && project.learnMoreLink !== '#' ? '_blank' : '_self'} rel="noopener noreferrer">
                                       {project.button2Text || 'Learn More'}
                                   </a>
                               </Button>
                          </CardFooter>
                      </Card>
                    );
                  })}
              </div>
            )}
      </div>
    </SectionContainer>
  );
}
