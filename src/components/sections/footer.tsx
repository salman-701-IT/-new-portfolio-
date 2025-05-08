
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Github, Mail } from 'lucide-react'; // Import Mail from lucide-react
import SectionContainer from '../section-container';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/salman_loves_wild?igsh=MXN6cDRnazJkOXV2ag==', label: 'Instagram' }, // Replace with actual links
  { icon: Linkedin, href: 'https://www.linkedin.com/in/salmankhan-salmankhan-bb4161299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/salman-701-IT', label: 'GitHub' },
];

const mailtoLink = 'mailto:salmankhan701.it@gmail.com'; // Updated email


export function Footer() {
   const [currentYear, setCurrentYear] = useState<number | null>(null);

   useEffect(() => {
     // Get year only on client-side after mount to avoid hydration mismatch
     setCurrentYear(new Date().getFullYear());
   }, []);

  return (
    <SectionContainer as="footer" className="py-8 border-t border-border/10 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {socialLinks.map((link, index) => (
            <Button key={index} variant="ghost" size="icon" asChild className="group rounded-full hover:bg-accent/20 ">
              <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))] duration-300" />
              </a>
            </Button>
          ))}
           {/* Mail icon linking to email */}
           <Button variant="ghost" size="icon" asChild className="group rounded-full hover:bg-accent/20">
              <a href={mailtoLink} aria-label="Email Salman Khan">
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_hsl(var(--accent))] duration-300" />
              </a>
            </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {/* Render year only when available */}
          {currentYear && `© ${currentYear} Salman Khan S. All rights reserved.`} {/* Added initial */}
        </p>
      </div>
    </SectionContainer>
  );
}
