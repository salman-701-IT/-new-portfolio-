'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating project descriptions based on project titles and technologies used.
 *
 * - generateProjectDescriptions - A function that generates project descriptions.
 * - GenerateProjectDescriptionsInput - The input type for the generateProjectDescriptions function.
 * - GenerateProjectDescriptionsOutput - The output type for the generateProjectDescriptions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateProjectDescriptionsInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  technologiesUsed: z.string().describe('The technologies used in the project, comma separated.'),
});
export type GenerateProjectDescriptionsInput = z.infer<typeof GenerateProjectDescriptionsInputSchema>;

const GenerateProjectDescriptionsOutputSchema = z.object({
  projectDescription: z.string().describe('A detailed description of the project.'),
});
export type GenerateProjectDescriptionsOutput = z.infer<typeof GenerateProjectDescriptionsOutputSchema>;

export async function generateProjectDescriptions(input: GenerateProjectDescriptionsInput): Promise<GenerateProjectDescriptionsOutput> {
  return generateProjectDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionsPrompt',
  input: {
    schema: z.object({
      projectTitle: z.string().describe('The title of the project.'),
      technologiesUsed: z.string().describe('The technologies used in the project, comma separated.'),
    }),
  },
  output: {
    schema: z.object({
      projectDescription: z.string().describe('A detailed description of the project.'),
    }),
  },
  prompt: `You are an expert in generating compelling project descriptions for portfolio websites.

  Given the project title and the technologies used, generate a detailed and engaging description for the project.

  Project Title: {{{projectTitle}}}
  Technologies Used: {{{technologiesUsed}}}

  Project Description:`,
});

const generateProjectDescriptionsFlow = ai.defineFlow<
  typeof GenerateProjectDescriptionsInputSchema,
  typeof GenerateProjectDescriptionsOutputSchema
>({
  name: 'generateProjectDescriptionsFlow',
  inputSchema: GenerateProjectDescriptionsInputSchema,
  outputSchema: GenerateProjectDescriptionsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return {projectDescription: output!.projectDescription};
});
