'use server';

/**
 * @fileOverview 에세이의 한국어 요약을 생성합니다.
 *
 * - generateKoreanSummary - 에세이의 한국어 요약을 생성하는 함수입니다.
 * - GenerateKoreanSummaryInput - generateKoreanSummary 함수의 입력 타입입니다.
 * - GenerateKoreanSummaryOutput - generateKoreanSummary 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKoreanSummaryInputSchema = z.object({
  essay: z.string().describe('요약할 에세이.'),
});
export type GenerateKoreanSummaryInput = z.infer<typeof GenerateKoreanSummaryInputSchema>;

const GenerateKoreanSummaryOutputSchema = z.object({
  summary: z.string().describe('에세이의 한국어 요약.'),
  progress: z.string().describe('요약 생성 진행 상황.'),
});
export type GenerateKoreanSummaryOutput = z.infer<typeof GenerateKoreanSummaryOutputSchema>;

export async function generateKoreanSummary(input: GenerateKoreanSummaryInput): Promise<GenerateKoreanSummaryOutput> {
  return generateKoreanSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKoreanSummaryPrompt',
  input: {schema: GenerateKoreanSummaryInputSchema},
  output: {schema: GenerateKoreanSummaryOutputSchema},
  prompt: `다음 에세이를 3-5 문장으로 한국어로 요약해 주세요:\n\n{{essay}}`,
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
      progress: '에세이의 한국어 요약을 생성했습니다.',
    };
  }
);
