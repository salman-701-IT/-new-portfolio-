// src/types/project.ts

import type { LucideIcon } from 'lucide-react';
import type React from 'react'; // Import React type

export interface Project {
  id: string; // Firestore document ID or unique identifier
  title: string;
  icon: string | LucideIcon; // Allow string for icon name from Lucide or the component itself
  description: string;
  longDescription?: string; // Optional detailed description for the project page
  image: string; // URL to the image (placeholder or actual)
  aiHint: string;
  tech: string[];
  demoLink?: string;
  learnMoreLink?: string; // Link to the dynamic project page
  button1Text: string;
  button2Text: string;
  category: string[];
  iconComponent?: React.ElementType; // Optional field to store the resolved icon component
}
