
// src/types/project.ts

import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string; // Firestore document ID
  title: string;
  icon: string | LucideIcon; // Allow string for icon name from Lucide or the component itself
  description: string;
  image: string; // URL to the image in Firebase Storage
  aiHint: string;
  tech: string[];
  demoLink?: string;
  learnMoreLink?: string;
  button1Text: string;
  button2Text: string;
  category: string[];
}
