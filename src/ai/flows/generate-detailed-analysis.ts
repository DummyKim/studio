// src/ai/flows/generate-detailed-analysis.ts
'use server';

/**
 * @fileOverview 에세이의 내용, 구조, 문법, 어휘에 대한 상세 분석을 생성합니다.
 *
 * - generateDetailedAnalysis - 상세 분석을 생성하는 함수입니다.
 * - GenerateDetailedAnalysisInput - generateDetailedAnalysis 함수의 입력 타입입니다.
 * - GenerateDetailedAnalysisOutput - generateDetailedAnalysis 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDetailedAnalysisInputSchema = z.object({
  essay: z.string().describe('분석할 에세이.'),
});
export type GenerateDetailedAnalysisInput = z.infer<typeof GenerateDetailedAnalysisInputSchema>;

const GenerateDetailedAnalysisOutputSchema = z.object({
  contentAnalysis: z.string().describe('내용, 강점, 약점, 학생 예시 문장을 포함한 에세이 내용의 상세 분석.'),
  structureAnalysis: z.string().describe('구조, 강점, 약점, 학생 예시 문장을 포함한 에세이 구조의 상세 분석.'),
  grammarAnalysis: z.string().describe('문법, 강점, 약점, 학생 예시 문장을 포함한 에세이 문법의 상세 분석.'),
  vocabularyAnalysis: z.string().describe('어휘, 강점, 약점, 학생 예시 문장을 포함한 에세이 어휘의 상세 분석.'),
});
export type GenerateDetailedAnalysisOutput = z.infer<typeof GenerateDetailedAnalysisOutputSchema>;

export async function generateDetailedAnalysis(input: GenerateDetailedAnalysisInput): Promise<GenerateDetailedAnalysisOutput> {
  return generateDetailedAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDetailedAnalysisPrompt',
  input: {schema: GenerateDetailedAnalysisInputSchema},
  output: {schema: GenerateDetailedAnalysisOutputSchema},
  prompt: `당신은 학생 에세이에 대한 상세한 피드백을 제공하는 전문 영어 교사입니다. 다음 에세이를 내용, 구조, 문법, 어휘 측면에서 분석해주세요. 각 측면에 대해 구체적인 강점과 약점을 제시하고, 학생의 에세이에서 가져온 예시 문장으로 당신의 요점을 설명해주세요.\n\n에세이:\n{{{essay}}}`,
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
