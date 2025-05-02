
'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
// Removed Canvas import
// Removed drei imports (Text3D, Center, OrbitControls)
// Removed react-spring/three imports
// Removed three import
import { Skeleton } from '@/components/ui/skeleton';

// Removed AnimatedText Component

// Main component
export default function ThreeDTextClient() {
   const [isMounted, setIsMounted] = useState(false);
   const [fontData, setFontData] = useState<any>(null); // State for font data
   const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        setIsMounted(true);
        // Fetch font data on mount (though it's not used anymore)
        fetch('/fonts/Geist_Bold.json') // Fetch from the public URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFontData(data); // Keep setting data in case needed later, but not used for rendering
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to load font:', error);
                setIsLoading(false); // Stop loading even on error
            });
    }, []);

    if (!isMounted || isLoading) {
       return <div className="h-[250px] w-full flex items-center justify-center"><Skeleton className="h-[250px] w-full bg-transparent" /></div>;
    }

  return (
    <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground">
        3D Text Placeholder (Canvas Removed)
         {/* Original Canvas code removed
         <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
            <Center>
              <AnimatedText fontData={fontData} />
            </Center>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
         */}
         </div>
  );
}
