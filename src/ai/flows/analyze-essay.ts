// src/ai/flows/analyze-essay.ts
'use server';
/**
 * @fileOverview Analyzes an essay based on pre-defined criteria.
 *
 * - analyzeEssay - A function that handles the essay analysis process.
 * - AnalyzeEssayInput - The input type for the analyzeEssay function.
 * - AnalyzeEssayOutput - The return type for the analyzeEssay function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEssayInputSchema = z.object({
  essay: z.string().describe('The essay to be analyzed.'),
});
export type AnalyzeEssayInput = z.infer<typeof AnalyzeEssayInputSchema>;

const AnalyzeEssayOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the essay.'),
  contentAnalysis: z.object({
    strengths: z.string().describe('Strengths of the essay content.'),
    weaknesses: z.string().describe('Weaknesses of the essay content.'),
    example: z.string().describe('An example sentence from the essay related to the content analysis.'),
  }).describe('Detailed analysis of the essay content.'),
  structureAnalysis: z.object({
    strengths: z.string().describe('Strengths of the essay structure.'),
    weaknesses: z.string().describe('Weaknesses of the essay structure.'),
    example: z.string().describe('An example sentence from the essay related to the structure analysis.'),
  }).describe('Detailed analysis of the essay structure.'),
  grammarAnalysis: z.object({
    strengths: z.string().describe('Strengths of the essay grammar.'),
    weaknesses: z.string().describe('Weaknesses of the essay grammar.'),
    example: z.string().describe('An example sentence from the essay related to the grammar analysis.'),
  }).describe('Detailed analysis of the essay grammar.'),
  vocabularyAnalysis: z.object({
    strengths: z.string().describe('Strengths of the essay vocabulary.'),
    weaknesses: z.string().describe('Weaknesses of the essay vocabulary.'),
    example: z.string().describe('An example sentence from the essay related to the vocabulary analysis.'),
  }).describe('Detailed analysis of the essay vocabulary.'),
  overallSummary: z.string().describe('An overall summary of the essay analysis.'),
  summaryInKorean: z.string().describe('A summary of the essay in Korean.'),
});
export type AnalyzeEssayOutput = z.infer<typeof AnalyzeEssayOutputSchema>;

export async function analyzeEssay(input: AnalyzeEssayInput): Promise<AnalyzeEssayOutput> {
  return analyzeEssayFlow(input);
}

const analyzeEssayPrompt = ai.definePrompt({
  name: 'analyzeEssayPrompt',
  input: {schema: AnalyzeEssayInputSchema},
  output: {schema: AnalyzeEssayOutputSchema},
  prompt: `You are an expert essay grader. Analyze the following essay based on the criteria of content, structure, grammar, and vocabulary.

Essay:
{{{essay}}}

Provide a summary, detailed analysis of each criteria (strengths, weaknesses and an example sentence from the essay), an overall summary, and a summary in Korean.

Make sure to include example sentences from the original essay.

Ensure that the summary in Korean is in Korean.

Output in JSON format.

{{output}}`,
});

const analyzeEssayFlow = ai.defineFlow(
  {
    name: 'analyzeEssayFlow',
    inputSchema: AnalyzeEssayInputSchema,
    outputSchema: AnalyzeEssayOutputSchema,
  },
  async input => {
    const {output} = await analyzeEssayPrompt(input);
    return output!;
  }
);
