'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: '3D Product Showcase',
    description: 'Interactive 3D product visualization using Three.js.',
    image: 'https://picsum.photos/seed/project1/400/300',
    tech: ['Three.js', 'React'],
    aiHint: '3d product render',
  },
  {
    title: 'Animated Portfolio',
    description: 'Personal portfolio website with engaging Spline animations.',
    image: 'https://picsum.photos/seed/project2/400/300',
    tech: ['Spline', 'Next.js'],
    aiHint: 'abstract animation portfolio',
  },
  {
    title: 'Voice-Controlled Game UI',
    description: 'Accessible game interface controlled via voice commands.',
    image: 'https://picsum.photos/seed/project3/400/300',
    tech: ['Web Speech API', 'JavaScript'],
    aiHint: 'game ui voice',
  },
  {
    title: 'Face Liveness Detection',
    description: 'Biometric security system to prevent spoofing attacks.',
    image: 'https://picsum.photos/seed/project4/400/300',
    tech: ['TensorFlow.js', 'Computer Vision'],
    aiHint: 'face recognition security',
  },
  {
    title: 'Skill Course Platform',
    description: 'E-learning platform with certification and user dashboards.',
    image: 'https://picsum.photos/seed/project5/400/300',
    tech: ['React', 'Firebase', 'Node.js'],
    aiHint: 'online course dashboard',
  },
  {
    title: 'Passport Automation System',
    description: 'Streamlined passport application and processing system.',
    image: 'https://picsum.photos/seed/project6/400/300',
    tech: ['Next.js', 'Database'],
     aiHint: 'government form automation',
  },
    {
    title: 'Green Campus IoT',
    description: 'IoT system for monitoring environmental factors on campus.',
    image: 'https://picsum.photos/seed/project7/400/300',
    tech: ['ESP32', 'Sensors', 'Firebase'],
    aiHint: 'iot dashboard environment',
  },
];

const mailtoLink = 'mailto:salmankhan701.it@email.com?subject=Project%20Inquiry';

export function ProjectsSection() {
 const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionContainer id="projects" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                <Card key={index} className="glassmorphism group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary hover:scale-[1.02] hover:neon-glow-primary">
                    <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden">
                        <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={project.aiHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300" />
                    </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                    <CardTitle className="mb-2 text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="px-2 py-0.5 text-xs font-medium bg-secondary rounded-full text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                        >
                            {tech}
                        </span>
                        ))}
                    </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                     <Button variant="outline" className="w-full group/button" asChild>
                        <a href={mailtoLink + ` regarding ${encodeURIComponent(project.title)}`}>
                            Contact Me <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
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
