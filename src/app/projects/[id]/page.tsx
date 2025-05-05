'use client'; // Mark as client component for state and effects if needed later

import React from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getProjectById } from '@/lib/data'; // Function to get project details by ID
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionContainer from '@/components/section-container';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

// Define params type for the page component
interface ProjectDetailPageParams {
  id: string;
}

export default function ProjectDetailPage() {
  const params = useParams<ProjectDetailPageParams>();
  const projectId = params.id;
  const project = getProjectById(projectId);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  const IconComponent = project.iconComponent as React.ElementType;

  return (
    <SectionContainer className="py-16 md:py-24 animate-fade-in-slow">
       <div className="mb-8">
           <Button variant="outline" asChild>
               <Link href="/#projects">
                   <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
               </Link>
           </Button>
       </div>

      <Card className="glassmorphism overflow-hidden border-primary neon-glow-primary">
        <CardHeader className="relative p-0">
           <div className="absolute top-6 right-6 z-10 p-3 bg-primary/80 rounded-full backdrop-blur-sm neon-glow-primary">
               {IconComponent && <IconComponent className="w-6 h-6 text-primary-foreground" />}
           </div>
           <div className="relative w-full h-64 md:h-96"> {/* Increased height */}
              <Image
                src={project.image || 'https://picsum.photos/seed/placeholder/800/600'}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.aiHint}
                className="opacity-80" // Slight opacity to blend
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" /> {/* Gradient overlay */}
           </div>
           <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10">
               <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-glow-primary mb-2">{project.title}</CardTitle>
                <p className="text-lg text-muted-foreground">{project.description}</p>
           </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
             <h3 className="text-xl font-semibold mb-3 text-accent">Project Details</h3>
             {/* Use longDescription if available, otherwise fallback to description */}
             <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                 {project.longDescription || project.description}
             </p>
          </div>

          <Separator className="my-6" />

           <div className="flex flex-col sm:flex-row gap-4">
                {project.demoLink && project.demoLink !== '#' && (
                    <Button variant="default" size="lg" asChild className="flex-1 group neon-glow-primary">
                         <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                           {project.button1Text || 'View Demo'} <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                )}
                 {/* Link back to the main projects section as a fallback or alternative */}
                 <Button variant="outline" size="lg" asChild className="flex-1 group">
                    <Link href="/#projects">
                        View All Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </Button>
           </div>

        </CardContent>
      </Card>
    </SectionContainer>
  );
}
