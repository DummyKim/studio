// src/ai/flows/generate-detailed-analysis.ts
'use server';

/**
 * @fileOverview Generates a detailed analysis of an essay's content, structure, grammar, and vocabulary.
 *
 * - generateDetailedAnalysis - A function that generates the detailed analysis.
 * - GenerateDetailedAnalysisInput - The input type for the generateDetailedAnalysis function.
 * - GenerateDetailedAnalysisOutput - The return type for the generateDetailedAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDetailedAnalysisInputSchema = z.object({
  essay: z.string().describe('The essay to be analyzed.'),
});
export type GenerateDetailedAnalysisInput = z.infer<typeof GenerateDetailedAnalysisInputSchema>;

const GenerateDetailedAnalysisOutputSchema = z.object({
  contentAnalysis: z.string().describe('Detailed analysis of the essay content, including strengths, weaknesses, and student example sentences.'),
  structureAnalysis: z.string().describe('Detailed analysis of the essay structure, including strengths, weaknesses, and student example sentences.'),
  grammarAnalysis: z.string().describe('Detailed analysis of the essay grammar, including strengths, weaknesses, and student example sentences.'),
  vocabularyAnalysis: z.string().describe('Detailed analysis of the essay vocabulary, including strengths, weaknesses, and student example sentences.'),
});
export type GenerateDetailedAnalysisOutput = z.infer<typeof GenerateDetailedAnalysisOutputSchema>;

export async function generateDetailedAnalysis(input: GenerateDetailedAnalysisInput): Promise<GenerateDetailedAnalysisOutput> {
  return generateDetailedAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDetailedAnalysisPrompt',
  input: {schema: GenerateDetailedAnalysisInputSchema},
  output: {schema: GenerateDetailedAnalysisOutputSchema},
  prompt: `You are an expert English teacher providing detailed feedback on student essays. Analyze the following essay in terms of its content, structure, grammar, and vocabulary. For each aspect, provide specific strengths and weaknesses, and illustrate your points with example sentences from the student's essay.\n\nEssay:\n{{{essay}}}`,
});

const generateDetailedAnalysisFlow = ai.defineFlow(
  {
    name: 'generateDetailedAnalysisFlow',
    inputSchema: GenerateDetailedAnalysisInputSchema,
    outputSchema: GenerateDetailedAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
