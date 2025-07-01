'use server';

import { analyzeEssay, type AnalyzeEssayInput, type AnalyzeEssayOutput } from '@/ai/flows/analyze-essay';

export async function getAnalysis(
  data: AnalyzeEssayInput
): Promise<{ result: AnalyzeEssayOutput | null; error: string | null }> {
  try {
    if (!data.essay || data.essay.trim().length < 50) {
      return { result: null, error: 'Please provide an essay with at least 50 characters.' };
    }
    if (data.essay.trim().length > 10000) {
        return { result: null, error: 'The essay cannot exceed 10,000 characters.' };
    }

    const result = await analyzeEssay({ essay: data.essay });
    return { result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { result: null, error: `Failed to analyze the essay. ${errorMessage}` };
  }
}
