
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, User, Code, Briefcase, Mail, Sun, Moon, Shield } from 'lucide-react'; // Import Sun, Moon, Shield icons
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/theme-provider'; // Import useTheme hook

const navLinks = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#skills', label: 'Skills', icon: Code },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#contact', label: 'Contact', icon: Mail },
  { href: '/admin', label: 'Admin', icon: Shield }, // Add Admin link
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder or null during SSR/hydration to avoid mismatch
     return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="hover:text-accent hover:bg-accent/10"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      // Only access window if mounted (client-side)
      if (typeof window !== 'undefined') {
        if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
      }
    };

    // Ensure event listener is added only on the client-side after mount
    if (isMounted && typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMounted]);

  if (!isMounted) {
    // Render nothing or a placeholder on the server/initial render
    return <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent transition-all duration-300"></header>;
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glassmorphism border-b border-border/30 py-2' : 'py-4'
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Logo/Brand - Simple Text for now */}
        <Link href="/#hero" className="text-xl font-bold text-primary text-glow-primary transition-colors hover:text-accent">
          SK
        </Link>

         {/* Desktop Navigation & Theme Toggle */}
         <div className="hidden md:flex items-center space-x-1">
            <nav className="flex space-x-1">
                {navLinks.map((link) => (
                    <Button key={link.href} variant="ghost" asChild className="text-sm font-medium text-foreground/80 hover:text-accent hover:bg-accent/10">
                       {/* Use Next Link for internal navigation, regular anchor for hash links */}
                      {link.href.startsWith('/') ? (
                         <Link href={link.href}>{link.label}</Link>
                       ) : (
                         <a href={link.href}>{link.label}</a>
                       )}
                    </Button>
                ))}
            </nav>
            <ThemeToggle /> {/* Add ThemeToggle here */}
        </div>


        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle /> {/* Add ThemeToggle for mobile view as well */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="neon-glow hover:neon-glow-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] glassmorphism p-4">
              <nav className="flex flex-col space-y-4 mt-8">
                 <Link href="/#hero" className="text-xl font-bold text-primary text-glow-primary mb-4">
                    SK
                 </Link>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className="justify-start text-foreground/90 hover:text-accent hover:bg-accent/10"
                  >
                     {/* Use Next Link for internal navigation, regular anchor for hash links */}
                     {link.href.startsWith('/') ? (
                       <Link href={link.href}>
                         <link.icon className="mr-2 h-4 w-4" />
                         {link.label}
                       </Link>
                      ) : (
                        <a href={link.href}>
                          <link.icon className="mr-2 h-4 w-4" />
                          {link.label}
                        </a>
                      )}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
