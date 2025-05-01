'use client';

import React from 'react';
// Import any context providers or setup components here if needed in the future
// e.g., import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // Wrap children with any necessary providers
  // return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  return <>{children}</>;
}
