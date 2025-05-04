
// src/lib/firebase/firestore.ts
import { db, storage } from './config'; // Assuming you have db and storage initialized in config
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp, // Optional: for tracking creation/update times
  query,
  orderBy,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import type { Project } from '@/types/project';

const PROJECTS_COLLECTION = 'projects';

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsCol = collection(db, PROJECTS_COLLECTION);
     // Optional: Order projects, e.g., by title or a timestamp if you add one
    // const q = query(projectsCol, orderBy("title"));
    const q = query(projectsCol); // Simple query without ordering for now
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

// Add a new project
export const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      // createdAt: serverTimestamp(), // Optional: add a creation timestamp
    });
     // Return the newly created project with its ID
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error("Error adding project: ", error);
    throw new Error("Could not add project.");
  }
};

// Update an existing project
export const updateProject = async (id: string, projectData: Partial<Omit<Project, 'id'>>): Promise<void> => {
  try {
    const projectDoc = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectDoc, {
        ...projectData,
        // updatedAt: serverTimestamp(), // Optional: add an update timestamp
        });
  } catch (error) {
    console.error("Error updating project: ", error);
    throw new Error("Could not update project.");
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
   try {
    // Optional: Delete associated image from storage first
    // const projectToDelete = await getDoc(doc(db, PROJECTS_COLLECTION, id));
    // if (projectToDelete.exists() && projectToDelete.data().image) {
    //   try {
    //      const imageRef = ref(storage, projectToDelete.data().image);
    //      await deleteObject(imageRef);
    //   } catch (storageError) {
    //      console.warn("Could not delete image from storage:", storageError);
    //      // Decide if you want to proceed with Firestore deletion even if storage fails
    //   }
    // }
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw new Error("Could not delete project.");
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw new Error("Could not upload image.");
  }
};
