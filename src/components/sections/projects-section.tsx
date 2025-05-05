'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react'; // Removed other icons, keep Loader2
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getAllProjects } from '@/lib/data'; // Import function to get projects
import type { Project } from '@/types/project'; // Import Project type


const mailtoBase = 'mailto:salmankhan701.it@gmail.com'; // Keep base email for demo requests if needed

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
    try {
        const fetchedProjects = getAllProjects(); // Get projects from centralized data source
        setProjects(fetchedProjects);
    } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects.");
    } finally {
        setIsLoading(false);
    }
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
                    const IconComponent = project.iconComponent as React.ElementType; // Get the resolved icon component

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
                                 {IconComponent && <IconComponent className="w-5 h-5 text-primary-foreground" />}
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
                                   <a href={project.demoLink && project.demoLink !== '#' ? project.demoLink : `${mailtoBase}?subject=Demo%20Request:%20${encodeURIComponent(project.title)}`} target={project.demoLink && project.demoLink !== '#' ? '_blank' : '_self'} rel="noopener noreferrer">
                                      {project.button1Text || 'View Demo'} <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                                   </a>
                               </Button>
                               {/* Button 2 (Learn More - Links to detail page) */}
                               <Button variant="ghost" size="sm" className="flex-1 group/button text-muted-foreground hover:bg-accent/10 hover:text-accent" asChild>
                                    {/* Use Next.js Link for internal navigation */}
                                    <Link href={project.learnMoreLink || '#'}>
                                        {project.button2Text || 'Learn More'}
                                    </Link>
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
