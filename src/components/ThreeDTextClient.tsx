
'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
// Removed imports for @react-three/fiber (Canvas, useFrame)
// Removed imports for @react-three/drei (Text3D, Center, OrbitControls)
// Removed import for @react-spring/three (useSpring, animated)
// Removed import for three
import { Skeleton } from '@/components/ui/skeleton';
// Font data fetching logic remains for potential future use, but 3D text rendering is removed

// Removed AnimatedText component

// Main component
export default function ThreeDTextClient() {
   const [isMounted, setIsMounted] = useState(false);
   const [fontData, setFontData] = useState<any>(null); // State for font data remains
   const [isLoading, setIsLoading] = useState(true); // Loading state remains

    useEffect(() => {
        setIsMounted(true);
        // Fetch font data on mount (kept in case needed elsewhere)
        fetch('/fonts/Geist_Bold.json') // Fetch from the public URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFontData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to load font:', error);
                setIsLoading(false); // Stop loading even on error
            });
    }, []);

    if (!isMounted || isLoading) {
       // Keep skeleton during loading
       return <div className="h-[250px] w-full flex items-center justify-center"><Skeleton className="h-[250px] w-full bg-transparent" /></div>;
    }

  // Return a placeholder div as Canvas is removed
  return (
    <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground">
      3D Text Placeholder (Canvas removed)
      {/* Original Canvas code removed */}
    </div>
  );
}

