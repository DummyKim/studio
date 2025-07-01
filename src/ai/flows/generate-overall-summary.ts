'use server';

/**
 * @fileOverview 에세이 분석의 종합 요약을 생성하는 플로우입니다.
 *
 * - generateOverallSummary - 종합 요약을 생성하는 함수입니다.
 * - GenerateOverallSummaryInput - generateOverallSummary 함수의 입력 타입입니다.
 * - GenerateOverallSummaryOutput - generateOverallSummary 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOverallSummaryInputSchema = z.object({
  summary: z.string().describe('내용, 구조, 문법, 어휘 분석 요약.'),
});
export type GenerateOverallSummaryInput = z.infer<typeof GenerateOverallSummaryInputSchema>;

const GenerateOverallSummaryOutputSchema = z.object({
  overallSummary: z.string().describe('에세이 분석의 종합 요약.'),
});
export type GenerateOverallSummaryOutput = z.infer<typeof GenerateOverallSummaryOutputSchema>;

export async function generateOverallSummary(input: GenerateOverallSummaryInput): Promise<GenerateOverallSummaryOutput> {
  return generateOverallSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOverallSummaryPrompt',
  input: {schema: GenerateOverallSummaryInputSchema},
  output: {schema: GenerateOverallSummaryOutputSchema},
  prompt: `당신은 에세이 분석의 종합 요약을 제공할 수 있는 전문 에세이 분석가입니다.

  다음 내용, 구조, 문법, 어휘 분석 요약을 바탕으로 4-6 문장의 종합 요약을 제공해주세요:

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
