
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Default to dark as per original setup
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage only on the client side
    if (typeof window !== 'undefined') {
        try {
            const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
            if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
                return storedTheme;
            }
            // Check system preference if no stored theme
            // const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // return systemPrefersDark ? 'dark' : 'light';
        } catch (e) {
            console.error('Error reading theme from localStorage', e);
            // Fallback to default if localStorage access fails
        }
    }
    // Return default theme during SSR or if localStorage is unavailable/empty
    return defaultTheme;
  });

  useEffect(() => {
     // Only run effects on the client
    if (typeof window !== 'undefined') {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        try {
            localStorage.setItem(storageKey, theme);
        } catch (e) {
            console.error('Error saving theme to localStorage', e);
        }
    }
  }, [theme, storageKey]);

   const setTheme = (newTheme: Theme) => {
     setThemeState(newTheme);
   };


  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
