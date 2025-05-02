
'use client';

import React from 'react';
import { ThemeProvider } from '@/context/theme-provider'; // Import ThemeProvider
// Import any other context providers or setup components here if needed in the future
// e.g., import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // Wrap children with necessary providers, including ThemeProvider
  // Ensure ThemeProvider is used correctly according to its implementation
  // (e.g., if it needs specific props)
  return (
     <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
       {/* <QueryClientProvider client={queryClient}> */}
         {children}
       {/* </QueryClientProvider> */}
      </ThemeProvider>
   );
}
