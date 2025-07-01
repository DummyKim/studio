'use server';

/**
 * @fileOverview A flow to generate an overall summary of the essay analysis.
 *
 * - generateOverallSummary - A function that generates the overall summary.
 * - GenerateOverallSummaryInput - The input type for the generateOverallSummary function.
 * - GenerateOverallSummaryOutput - The return type for the generateOverallSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOverallSummaryInputSchema = z.object({
  summary: z.string().describe('Summaries of content, structure, grammar, and vocabulary analysis.'),
});
export type GenerateOverallSummaryInput = z.infer<typeof GenerateOverallSummaryInputSchema>;

const GenerateOverallSummaryOutputSchema = z.object({
  overallSummary: z.string().describe('An overall summary of the essay analysis.'),
});
export type GenerateOverallSummaryOutput = z.infer<typeof GenerateOverallSummaryOutputSchema>;

export async function generateOverallSummary(input: GenerateOverallSummaryInput): Promise<GenerateOverallSummaryOutput> {
  return generateOverallSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOverallSummaryPrompt',
  input: {schema: GenerateOverallSummaryInputSchema},
  output: {schema: GenerateOverallSummaryOutputSchema},
  prompt: `You are an expert essay analyzer who can provide an overall summary of the essay analysis.

  Please provide a 4-6 sentence overall summary based on the following summaries of the content, structure, grammar, and vocabulary analysis:

  {{{summary}}}
  `,
});

const generateOverallSummaryFlow = ai.defineFlow(
  {
    name: 'generateOverallSummaryFlow',
    inputSchema: GenerateOverallSummaryInputSchema,
    outputSchema: GenerateOverallSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
