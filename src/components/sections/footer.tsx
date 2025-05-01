'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Github } from 'lucide-react';
import SectionContainer from '../section-container';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/salmankhan', label: 'Instagram' }, // Replace with actual links
  { icon: Linkedin, href: 'https://linkedin.com/in/salmankhan', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/salmankhan', label: 'GitHub' },
];

const mailtoLink = 'mailto:salmankhan701.it@email.com';


export function Footer() {
   const currentYear = new Date().getFullYear();
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
          © {currentYear} Salman Khan. All rights reserved.
        </p>
      </div>
    </SectionContainer>
  );
}

// Helper Mail icon component if not imported from lucide
const Mail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

