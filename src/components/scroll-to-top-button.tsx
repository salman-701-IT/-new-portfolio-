
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleVisibility = useCallback(() => {
    // Only access window if mounted (client-side)
    if (isMounted && typeof window !== 'undefined') {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, [isMounted]); // Depend on isMounted

  const scrollToTop = () => {
     // Only access window if mounted (client-side)
     if (isMounted && typeof window !== 'undefined') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
     }
  };

  useEffect(() => {
     // Ensure event listener is added only on the client-side after mount
     if (isMounted && typeof window !== 'undefined') {
        window.addEventListener('scroll', toggleVisibility);
        // Initial check in case the page is already scrolled down
        toggleVisibility();
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
     }
  }, [isMounted, toggleVisibility]); // Depend on isMounted and toggleVisibility

  // Don't render the button until mounted to avoid hydration issues with visibility state
  if (!isMounted) {
      return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 rounded-full transition-opacity duration-300 neon-glow hover:neon-glow-primary hover:scale-110 hover:bg-primary/80 hover:text-primary-foreground',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
