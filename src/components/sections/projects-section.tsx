'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { generateProjectDescriptions, GenerateProjectDescriptionsInput, GenerateProjectDescriptionsOutput } from '@/ai/flows/generate-project-descriptions'; // Import the Genkit flow
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  aiHint: string;
}

const initialProjects: Omit<Project, 'description'>[] = [
  {
    title: 'Interactive 3D Product Configurator', // More professional title
    image: 'https://picsum.photos/seed/project1/400/300',
    tech: ['Three.js', 'React', 'WebGL'], // Added WebGL
    aiHint: '3d product render interactive', // Updated hint
  },
  {
    title: 'Dynamic Animated Portfolio Website', // More descriptive title
    image: 'https://picsum.photos/seed/project2/400/300',
    tech: ['Spline', 'Next.js', 'GSAP'], // Added GSAP
    aiHint: 'abstract animation portfolio website', // Updated hint
  },
  {
    title: 'Voice-Activated Accessibility Interface', // More professional title
    image: 'https://picsum.photos/seed/project3/400/300',
    tech: ['Web Speech API', 'JavaScript', 'Accessibility'], // Added Accessibility
    aiHint: 'voice control ui accessibility', // Updated hint
  },
  {
    title: 'Biometric Face Liveness Verification System', // More specific title
    image: 'https://picsum.photos/seed/project4/400/300',
    tech: ['TensorFlow.js', 'Computer Vision', 'Security'], // Added Security
    aiHint: 'face recognition security biometrics', // Updated hint
  },
  {
    title: 'E-Learning Platform with Certification', // Standard term
    image: 'https://picsum.photos/seed/project5/400/300',
    tech: ['React', 'Firebase', 'Node.js', 'LMS'], // Added LMS
    aiHint: 'online course platform lms', // Updated hint
  },
  {
    title: 'Automated Passport Application Workflow', // More professional title
    image: 'https://picsum.photos/seed/project6/400/300',
    tech: ['Next.js', 'Database', 'Workflow Automation'], // Added Workflow Automation
     aiHint: 'government process automation application', // Updated hint
  },
    {
    title: 'IoT-Based Green Campus Monitoring System', // More descriptive title
    image: 'https://picsum.photos/seed/project7/400/300',
    tech: ['ESP32', 'Sensors', 'Firebase', 'IoT'], // Added IoT explicitly
    aiHint: 'iot dashboard environmental monitoring', // Updated hint
  },
];

const mailtoLink = 'mailto:salmankhan701.it@email.com?subject=Project%20Inquiry';

export function ProjectsSection() {
 const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

 const [projects, setProjects] = React.useState<Project[]>([]);
 const [loading, setLoading] = React.useState(true);
 const [error, setError] = React.useState<string | null>(null);

 React.useEffect(() => {
    const fetchDescriptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const describedProjects = await Promise.all(
          initialProjects.map(async (project) => {
            const input: GenerateProjectDescriptionsInput = {
              projectTitle: project.title,
              technologiesUsed: project.tech.join(', '),
            };
            const output: GenerateProjectDescriptionsOutput = await generateProjectDescriptions(input);
            return { ...project, description: output.projectDescription };
          })
        );
        setProjects(describedProjects);
      } catch (err) {
        console.error("Error generating project descriptions:", err);
        setError("Failed to load project descriptions. Displaying placeholders.");
        // Fallback to placeholder descriptions if AI fails
        setProjects(initialProjects.map(p => ({ ...p, description: `An innovative project utilizing ${p.tech.join(', ')}.` })));
      } finally {
        setLoading(false);
      }
    };

    fetchDescriptions();
 }, []); // Run only once on mount


  return (
    <SectionContainer id="projects" className="py-16 md:py-24">
       <div ref={ref} className={cn('scroll-fade-in', inView && 'scroll-fade-in-visible')}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Featured Projects</h2>
            {error && <p className="text-center text-destructive mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(loading ? Array.from({ length: initialProjects.length }) : projects).map((project, index) => (
                <Card key={index} className="glassmorphism group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary hover:scale-[1.02] hover:neon-glow-primary">
                    <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden">
                       {loading || !project ? (
                           <Skeleton className="w-full h-full" />
                       ) : (
                            <Image
                            src={project.image}
                            alt={project.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={project.aiHint}
                            />
                       )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300" />
                    </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                    {loading || !project ? (
                        <>
                         <Skeleton className="h-6 w-3/4 mb-2" />
                         <Skeleton className="h-4 w-full mb-4" />
                         <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton className="h-4 w-16 rounded-full" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                         </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                     <Button variant="outline" className="w-full group/button" asChild disabled={loading || !project}>
                        <a href={project ? `${mailtoLink} regarding ${encodeURIComponent(project.title)}` : mailtoLink}>
                            Inquire About Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
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
