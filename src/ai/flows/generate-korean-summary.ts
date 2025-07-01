'use server';

/**
 * @fileOverview Generates a Korean summary of an essay.
 *
 * - generateKoreanSummary - A function that generates a Korean summary of an essay.
 * - GenerateKoreanSummaryInput - The input type for the generateKoreanSummary function.
 * - GenerateKoreanSummaryOutput - The return type for the generateKoreanSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKoreanSummaryInputSchema = z.object({
  essay: z.string().describe('The essay to summarize.'),
});
export type GenerateKoreanSummaryInput = z.infer<typeof GenerateKoreanSummaryInputSchema>;

const GenerateKoreanSummaryOutputSchema = z.object({
  summary: z.string().describe('The Korean summary of the essay.'),
  progress: z.string().describe('Progress of the summary generation.'),
});
export type GenerateKoreanSummaryOutput = z.infer<typeof GenerateKoreanSummaryOutputSchema>;

export async function generateKoreanSummary(input: GenerateKoreanSummaryInput): Promise<GenerateKoreanSummaryOutput> {
  return generateKoreanSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKoreanSummaryPrompt',
  input: {schema: GenerateKoreanSummaryInputSchema},
  output: {schema: GenerateKoreanSummaryOutputSchema},
  prompt: `Please provide a Korean summary of the following essay in 3-5 sentences:\n\n{{essay}}`,
});

const generateKoreanSummaryFlow = ai.defineFlow(
  {
    name: 'generateKoreanSummaryFlow',
    inputSchema: GenerateKoreanSummaryInputSchema,
    outputSchema: GenerateKoreanSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a Korean summary of the essay.',
    };
  }
);
