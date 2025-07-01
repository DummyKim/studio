// src/ai/flows/analyze-essay.ts
'use server';
/**
 * @fileOverview 에세이를 미리 정의된 기준에 따라 분석합니다.
 *
 * - analyzeEssay - 에세이 분석 프로세스를 처리하는 함수입니다.
 * - AnalyzeEssayInput - analyzeEssay 함수의 입력 타입입니다.
 * - AnalyzeEssayOutput - analyzeEssay 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEssayInputSchema = z.object({
  essay: z.string().describe('분석할 에세이.'),
});
export type AnalyzeEssayInput = z.infer<typeof AnalyzeEssayInputSchema>;

const AnalyzeEssayOutputSchema = z.object({
  summary: z.string().describe('에세이에 대한 간략한 요약.'),
  contentAnalysis: z.object({
    strengths: z.string().describe('에세이 내용의 강점.'),
    weaknesses: z.string().describe('에세이 내용의 약점.'),
    example: z.string().describe('내용 분석과 관련된 에세이의 예시 문장.'),
  }).describe('에세이 내용에 대한 상세 분석.'),
  structureAnalysis: z.object({
    strengths: z.string().describe('에세이 구조의 강점.'),
    weaknesses: z.string().describe('에세이 구조의 약점.'),
    example: z.string().describe('구조 분석과 관련된 에세이의 예시 문장.'),
  }).describe('에세이 구조에 대한 상세 분석.'),
  grammarAnalysis: z.object({
    strengths: z.string().describe('에세이 문법의 강점.'),
    weaknesses: z.string().describe('에세이 문법의 약점.'),
    example: z.string().describe('문법 분석과 관련된 에세이의 예시 문장.'),
  }).describe('에세이 문법에 대한 상세 분석.'),
  vocabularyAnalysis: z.object({
    strengths: z.string().describe('에세이 어휘의 강점.'),
    weaknesses: z.string().describe('에세이 어휘의 약점.'),
    example: z.string().describe('어휘 분석과 관련된 에세이의 예시 문장.'),
  }).describe('에세이 어휘에 대한 상세 분석.'),
  overallSummary: z.string().describe('에세이 분석에 대한 종합 요약.'),
  summaryInKorean: z.string().describe('에세이에 대한 한국어 요약.'),
});
export type AnalyzeEssayOutput = z.infer<typeof AnalyzeEssayOutputSchema>;

export async function analyzeEssay(input: AnalyzeEssayInput): Promise<AnalyzeEssayOutput> {
  return analyzeEssayFlow(input);
}

const analyzeEssayPrompt = ai.definePrompt({
  name: 'analyzeEssayPrompt',
  input: {schema: AnalyzeEssayInputSchema},
  output: {schema: AnalyzeEssayOutputSchema},
  prompt: `당신은 전문적인 에세이 평가관입니다. 내용, 구조, 문법, 어휘 기준에 따라 다음 에세이를 분석해주세요.

에세이:
{{{essay}}}

간략한 요약, 각 기준(강점, 약점, 에세이의 예시 문장)에 대한 상세 분석, 종합 요약, 그리고 한국어 요약을 제공해주세요.

원본 에세이의 예시 문장을 반드시 포함해주세요.

한국어 요약은 반드시 한국어로 작성해주세요.

JSON 형식으로 출력해주세요.

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
