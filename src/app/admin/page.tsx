'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming Textarea component exists
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getProjects, addProject, updateProject, deleteProject, uploadImage } from '@/lib/firebase/firestore';
import type { Project } from '@/types/project'; // Assuming Project type definition exists
import { Loader2, Trash2, Edit, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


// Define Zod schema for project form validation
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  tech: z.string().min(1, 'Tech stack is required (comma-separated)'),
  category: z.string().min(1, 'Categories are required (comma-separated)'),
  demoLink: z.string().url().optional().or(z.literal('')),
  learnMoreLink: z.string().url().optional().or(z.literal('')),
  image: z.any().optional(), // Allow any file type initially
  aiHint: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function AdminPage() {
  // --- Authentication Placeholder ---
  // !!! WARNING: THIS IS NOT SECURE FOR PRODUCTION !!!
  // Replace with a proper authentication system (e.g., Firebase Auth)
  const isAuthenticated = true; // Simulate logged-in state
  // --------------------------------

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (!isAuthenticated) return; // Prevent fetching if not "authenticated"

    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch projects.' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated, toast]);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

   const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    if (!isAuthenticated) return;
    setIsSubmitting(true);

    try {
      let imageUrl = editingProject?.image || ''; // Keep existing image if not changed

      // Upload new image if provided
      if (imageFile) {
        const timestamp = Date.now();
        const imageName = `${timestamp}-${imageFile.name.replace(/\s+/g, '_')}`; // Create unique name
        imageUrl = await uploadImage(imageFile, `projects/${imageName}`);
        setImageFile(null); // Clear file input after upload attempt
      } else if (!imageUrl && !editingProject) {
        // Handle case where no image is provided for a new project (if required)
         toast({ variant: 'destructive', title: 'Error', description: 'Please upload an image for the new project.' });
         setIsSubmitting(false);
         return;
      }


      const projectData: Omit<Project, 'id'> = {
        title: data.title,
        description: data.description,
        tech: data.tech.split(',').map(t => t.trim()).filter(t => t), // Split and trim
        category: data.category.split(',').map(c => c.trim()).filter(c => c), // Split and trim
        demoLink: data.demoLink || '', // Use empty string if undefined
        learnMoreLink: data.learnMoreLink || '', // Use empty string if undefined
        image: imageUrl,
        aiHint: data.aiHint || '', // Use empty string if undefined
        // Assign a placeholder icon or handle icon selection differently if needed
        icon: 'Code', // Default or placeholder icon name
         button1Text: editingProject?.button1Text || 'View Demo', // Default texts
         button2Text: editingProject?.button2Text || 'Learn More',
      };


      if (editingProject) {
        // Update existing project
        await updateProject(editingProject.id, { ...projectData, icon: editingProject.icon }); // Pass existing icon
        setProjects(projects.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id, icon: editingProject.icon } : p));
        toast({ title: 'Success', description: 'Project updated successfully.' });
      } else {
        // Add new project
         const newProject = await addProject({ ...projectData }); // addProject returns the full project with ID
         setProjects([...projects, newProject]); // Add the new project with its ID
         toast({ title: 'Success', description: 'Project added successfully.' });
      }

      setEditingProject(null);
      reset(); // Reset form fields
      setImageFile(null); // Ensure file input is cleared visually


    } catch (error) {
      console.error("Error saving project:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save project.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setValue('title', project.title);
    setValue('description', project.description);
    setValue('tech', project.tech.join(', ')); // Join for editing
    setValue('category', project.category.join(', ')); // Join for editing
    setValue('demoLink', project.demoLink);
    setValue('learnMoreLink', project.learnMoreLink);
    setValue('aiHint', project.aiHint);
    setImageFile(null); // Clear any previously selected file
    // Note: We don't set the 'image' field value directly as it's a file input
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

   const handleDelete = async (id: string) => {
    if (!isAuthenticated) return;
    // Consider adding image deletion from storage here as well
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: 'Success', description: 'Project deleted.' });
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not delete project.' });
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    reset();
     setImageFile(null);
  };

   // --- Authentication Gate ---
   if (!isAuthenticated) {
     return (
       <div className="container mx-auto py-10 px-4">
         <Card className="max-w-md mx-auto">
           <CardHeader>
             <CardTitle>Admin Access Required</CardTitle>
           </CardHeader>
           <CardContent>
             <p>You must be logged in to manage portfolio content.</p>
             {/* Add a login button/link here in a real application */}
           </CardContent>
         </Card>
       </div>
     );
   }
   // -------------------------

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Admin Panel - Manage Portfolio</h1>

       {/* Add/Edit Project Form */}
       <Card className="mb-10">
         <CardHeader>
           <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
         </CardHeader>
         <form onSubmit={handleSubmit(onSubmit)}>
           <CardContent className="space-y-4">
              {/* Title */}
             <div>
               <Label htmlFor="title">Title</Label>
               <Input id="title" {...register('title')} />
               {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
             </div>
              {/* Description */}
             <div>
               <Label htmlFor="description">Description</Label>
               <Textarea id="description" {...register('description')} />
               {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
             </div>
             {/* Tech Stack */}
             <div>
               <Label htmlFor="tech">Tech Stack (comma-separated)</Label>
               <Input id="tech" {...register('tech')} placeholder="e.g., React, Firebase, Tailwind CSS" />
               {errors.tech && <p className="text-destructive text-sm mt-1">{errors.tech.message}</p>}
             </div>
              {/* Categories */}
             <div>
               <Label htmlFor="category">Categories (comma-separated)</Label>
               <Input id="category" {...register('category')} placeholder="e.g., AI, Web, IoT" />
               {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
             </div>
             {/* Demo Link */}
             <div>
               <Label htmlFor="demoLink">Demo Link (Optional)</Label>
               <Input id="demoLink" type="url" {...register('demoLink')} />
               {errors.demoLink && <p className="text-destructive text-sm mt-1">{errors.demoLink.message}</p>}
             </div>
             {/* Learn More Link */}
             <div>
               <Label htmlFor="learnMoreLink">Learn More Link (Optional)</Label>
               <Input id="learnMoreLink" type="url" {...register('learnMoreLink')} />
               {errors.learnMoreLink && <p className="text-destructive text-sm mt-1">{errors.learnMoreLink.message}</p>}
             </div>
             {/* AI Hint */}
              <div>
                <Label htmlFor="aiHint">Image AI Hint (Optional)</Label>
                <Input id="aiHint" {...register('aiHint')} placeholder="e.g., chatbot interface gradient" />
                {errors.aiHint && <p className="text-destructive text-sm mt-1">{errors.aiHint.message}</p>}
              </div>
              {/* Image Upload */}
             <div>
                <Label htmlFor="image">Project Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                {editingProject?.image && !imageFile && (
                  <p className="text-sm text-muted-foreground mt-1">Current image: <a href={editingProject.image} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View</a>. Upload a new file to replace.</p>
                )}
                 {imageFile && <p className="text-sm text-muted-foreground mt-1">Selected: {imageFile.name}</p>}
                {errors.image && <p className="text-destructive text-sm mt-1">{typeof errors.image.message === 'string' ? errors.image.message : 'Invalid file'}</p>}
            </div>

           </CardContent>
           <CardFooter className="flex justify-end gap-2">
                {editingProject && (
                    <Button type="button" variant="outline" onClick={cancelEdit} disabled={isSubmitting}>
                        Cancel Edit
                    </Button>
                )}
             <Button type="submit" disabled={isSubmitting}>
               {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (editingProject ? 'Update Project' : <PlusCircle className="mr-2 h-4 w-4" />)}
               {editingProject ? 'Update Project' : 'Add Project'}
             </Button>
           </CardFooter>
         </form>
       </Card>


      {/* Projects List */}
      <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
      {isLoading ? (
         <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-4">
               <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{project.title}</h3>
                   <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <p className="text-xs text-muted-foreground">Tech: {project.tech.join(', ')}</p>
                    <p className="text-xs text-muted-foreground">Categories: {project.category.join(', ')}</p>
                     {project.image && <p className="text-xs text-muted-foreground">Image: <a href={project.image} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Link</a></p>}
               </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                 <AlertDialog>
                   <AlertDialogTrigger asChild>
                     <Button variant="destructive" size="sm">
                       <Trash2 className="mr-1 h-4 w-4" /> Delete
                     </Button>
                   </AlertDialogTrigger>
                   <AlertDialogContent>
                     <AlertDialogHeader>
                       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                       <AlertDialogDescription>
                         This action cannot be undone. This will permanently delete the project
                         "{project.title}".
                       </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                       <AlertDialogCancel>Cancel</AlertDialogCancel>
                       <AlertDialogAction onClick={() => handleDelete(project.id)}>
                         Delete
                       </AlertDialogAction>
                     </AlertDialogFooter>
                   </AlertDialogContent>
                 </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

