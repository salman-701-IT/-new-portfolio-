
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, MessageSquare, Play, FileText, Eye, Gamepad2, Video, Tv, Award, CircuitBoard, BarChart, Bot, Code } from 'lucide-react'; // Added more specific icons
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Import Badge component

// Define the project structure
interface Project {
  id: number;
  title: string;
  icon: React.ElementType; // Icon component
  description: string;
  image: string; // Placeholder image URL
  aiHint: string; // Hint for AI image generation later
  tech: string[];
  demoLink?: string; // Optional demo link
  learnMoreLink?: string; // Optional learn more link (can be mailto)
  button1Text: string;
  button2Text: string;
  category: string[]; // Added category for potential filtering
}

const mailtoBase = 'mailto:salmankhan701.it@gmail.com'; // Updated base email

// Project data based on user request
const projectsData: Project[] = [
  {
    id: 1,
    title: 'Face Liveness Detection System',
    icon: Eye, // Using Eye icon as placeholder for 3D Face Mesh
    description: "An AI-powered system that detects whether a face is real or spoofed using webcam input. Enhances biometric authentication using live detection algorithms.",
    image: 'https://picsum.photos/seed/liveness/400/300',
    aiHint: 'ai face detection security overlay',
    tech: ['Python', 'TensorFlow.js', 'ONNX', 'OpenCV'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20Face%20Liveness%20Detection`, // Updated link
    button1Text: 'Try Live Demo',
    button2Text: 'Case Study',
    category: ['AI', 'Security'],
  },
  {
    id: 2,
    title: 'AI Chatbot with E-Commerce Support',
    icon: Bot, // Using Bot icon
    description: "Built a smart chatbot using Dialogflow that handles orders, responds to user queries, and tracks deliveries with contextual understanding.",
    image: 'https://picsum.photos/seed/chatbot/400/300',
    aiHint: 'chatbot interface ecommerce gradient',
    tech: ['Dialogflow', 'JS', 'Firebase'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20AI%20Chatbot`, // Updated link
    button1Text: 'Chat Demo',
    button2Text: 'See Flow',
    category: ['AI', 'Web', 'E-commerce'],
  },
  {
    id: 3,
    title: 'Voice-Controlled Vocational Game',
    icon: Gamepad2, // Using Gamepad2 icon
    description: "Designed a gamified simulation where learners perform skill tasks using only their voice — ideal for inclusive vocational education.",
    image: 'https://picsum.photos/seed/voicegame/400/300',
    aiHint: 'game interface voice control education',
    tech: ['JS', 'Web Speech API', 'Canvas'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20Voice%20Game`, // Updated link
    button1Text: 'Play Preview',
    button2Text: 'Learn More',
    category: ['Games', 'Web', 'Education'],
  },
  {
    id: 4,
    title: 'Yumaris Skill Learning LMS',
    icon: Award, // Using Award icon for certificate
    description: "A custom learning platform offering recorded skill courses, auto quizzes, and downloadable certification — powered by Firebase.",
    image: 'https://picsum.photos/seed/lms/400/300',
    aiHint: 'learning platform dashboard certificate',
    tech: ['HTML/CSS/JS', 'Firebase', 'PDFGen'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20Yumaris%20LMS`, // Updated link
    button1Text: 'Try Sample Course',
    button2Text: 'Download Cert',
    category: ['Web', 'Education', 'LMS'],
  },
  {
    id: 5,
    title: 'IoT Green Campus Automation',
    icon: CircuitBoard, // Using CircuitBoard icon
    description: "An IoT solution to monitor campus energy and environment using real-time sensors (water, CO₂, light) and control appliances wirelessly.",
    image: 'https://picsum.photos/seed/iot/400/300',
    aiHint: 'iot dashboard sensor graph circuit',
    tech: ['ESP32', 'Arduino', 'Wi-Fi', 'Sensors'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20IoT%20Green%20Campus`, // Updated link
    button1Text: 'View Sensor Demo',
    button2Text: 'See Wiring',
    category: ['IoT', 'Embedded'],
  },
  {
    id: 6,
    title: 'Multimedia Editing Portfolio',
    icon: Video, // Using Video icon
    description: "A showcase of YouTube intros, reels, event edits, and logo animations done for brands and influencers under Yumaris Media Services.",
    image: 'https://picsum.photos/seed/media/400/300',
    aiHint: 'video editing reel portfolio motion graphics',
    tech: ['Premiere Pro', 'Canva', 'After Effects'],
    demoLink: '#', // Placeholder link
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20Multimedia%20Portfolio`, // Updated link
    button1Text: 'Watch Reels',
    button2Text: 'View Designs',
    category: ['Media', 'Design'],
  },
  {
    id: 7,
    title: 'Client Websites by Yumaris',
    icon: Tv, // Using Tv icon for websites
    description: "Modern, fast-loading websites built for businesses with mobile-friendly designs and SEO optimization — using Firebase & React.",
    image: 'https://picsum.photos/seed/websites/400/300',
    aiHint: 'website mockup laptop modern responsive',
    tech: ['React', 'Tailwind', 'Firebase'],
    demoLink: '#', // Placeholder link for visiting a sample site
    learnMoreLink: `${mailtoBase}?subject=Inquiry:%20Client%20Websites`, // Updated link
    button1Text: 'Visit Site',
    button2Text: 'View Portfolio',
    category: ['Web', 'Design'],
  },
];


export function ProjectsSection() {
 const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

 // Use the static project data directly
 const projects = projectsData;
 const loading = false; // No loading needed as data is static
 const error = null; // No error handling needed for static data


  return (
    <SectionContainer id="projects" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Showcase</h2>
            {error && <p className="text-center text-destructive mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                <Card
                    key={project.id}
                    className={cn(
                        "glassmorphism group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary hover:scale-[1.03]",
                        // Add a subtle transform/tilt on hover
                        "hover:-translate-y-1 hover:shadow-primary/30"
                         // Removed neon glow for a cleaner look, relying on shadow and border
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation delay
                >
                    <CardHeader className="p-0 relative">
                        <div className="absolute top-4 right-4 z-10 p-2 bg-primary/80 rounded-full backdrop-blur-sm neon-glow-primary scale-90 group-hover:scale-100 transition-transform duration-300">
                           <project.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="relative w-full h-48 overflow-hidden">
                            <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={project.aiHint}
                            />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300" />
                         {/* Example Animation Overlay (Project 1: Scan line) */}
                         {project.id === 1 && (
                           <div className="absolute inset-0 top-0 left-0 h-full w-full overflow-hidden">
                               <div className="absolute top-0 left-0 h-1 w-full bg-red-500/70 shadow-[0_0_10px_red] opacity-0 group-hover:opacity-100 animate-scan group-hover:animate-scan-active"></div>
                               <style jsx>{`
                                @keyframes scan {
                                    0% { transform: translateY(-100%); }
                                    100% { transform: translateY(100%); }
                                }
                                .animate-scan-active {
                                    animation: scan 2s linear infinite;
                                }
                               `}</style>
                            </div>
                         )}
                         {/* Add other conditional animations here */}
                        </div>
                    </CardHeader>
                    <CardContent className="p-5 flex-grow flex flex-col"> {/* Use flex-col */}
                        <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p> {/* flex-grow pushes tech badges down */}
                        <div className="flex flex-wrap gap-2 mt-auto"> {/* Use mt-auto to push to bottom */}
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
                                {project.button1Text} <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                             </a>
                         </Button>
                         {/* Button 2 (Learn More or Secondary Action) */}
                         <Button variant="ghost" size="sm" className="flex-1 group/button text-muted-foreground hover:bg-accent/10 hover:text-accent" asChild>
                             <a href={project.learnMoreLink || `${mailtoBase}?subject=Inquiry:%20${encodeURIComponent(project.title)}`}>
                                 {project.button2Text}
                             </a>
                         </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
      </div>
    </SectionContainer>
  );
}
