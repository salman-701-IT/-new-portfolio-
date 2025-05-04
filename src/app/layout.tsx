import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { Providers } from './providers';
import Header from '@/components/header'; // Import Header

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Neo Portfolio - Salman Khan S.', // Added initial
  description:
    'Explore the portfolio of Salman Khan S., a Creative Technologist specializing in web development, AI solutions, creative media, and education. Founder of Yumaris Agency, based in Chennai, India.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Remove 'dark' class - ThemeProvider will manage this
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased font-sans bg-background text-foreground' // Rely on CSS variables from globals.css
        )}
      >
        <Providers>
          <Header /> {/* Add Header component */}
          <main>{children}</main>
          <Toaster /> {/* Add Toaster component */}
        </Providers>
      </body>
    </html>
  );
}
