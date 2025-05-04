
// src/lib/firebase/firestore.ts
import { db } from './config'; // Assuming you have db initialized in config
import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore';
import type { Project } from '@/types/project';

const PROJECTS_COLLECTION = 'projects';

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsCol = collection(db, PROJECTS_COLLECTION);
    // Simple query without ordering for now
    const q = query(projectsCol);
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
    return projects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw new Error("Could not fetch projects."); // Re-throw for handling in the component
  }
};

// Removed addProject function
// Removed updateProject function
// Removed deleteProject function
// Removed uploadImage function
