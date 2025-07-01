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

const AnalysisDetailSchema = z.object({
    koreanAnalysis: z.string().describe('해당 분석 영역(내용, 구성, 문법, 어휘)에 대한 1-2 문장의 한국어 요약 설명.'),
    strengths: z.string().describe('이 영역에서 발견된 강점 (한국어로 작성). 분석을 뒷받침하는 에세이의 예시 문장(영어)을 포함해야 합니다.'),
    weaknesses: z.string().describe('이 영역에서 발견된 약점 (한국어로 작성). 분석을 뒷받침하는 에세이의 예시 문장(영어)을 포함해야 합니다.'),
});

const AnalyzeEssayOutputSchema = z.object({
    summaryInKorean: z.string().describe('에세이 내용을 3-5 문장의 한국어러 요약.'),
    contentAnalysis: AnalysisDetailSchema.describe('에세이 내용 분석.'),
    structureAnalysis: AnalysisDetailSchema.describe('에세이 구성 분석.'),
    grammarAnalysis: AnalysisDetailSchema.describe('에세이 문법 분석.'),
    vocabularyAnalysis: AnalysisDetailSchema.describe('에세이 어휘 분석.'),
    overallSummary: z.string().describe('분석 전반에 대한 4-6 문장의 종합적인 한국어 요약.'),
});
export type AnalyzeEssayOutput = z.infer<typeof AnalyzeEssayOutputSchema>;

export async function analyzeEssay(input: AnalyzeEssayInput): Promise<AnalyzeEssayOutput> {
  return analyzeEssayFlow(input);
}

const analyzeEssayPrompt = ai.definePrompt({
  name: 'analyzeEssayPrompt',
  input: {schema: AnalyzeEssayInputSchema},
  output: {schema: AnalyzeEssayOutputSchema},
  prompt: `You are an expert essay evaluator for Korean teachers. Analyze the following essay based on content, structure, grammar, and vocabulary.
Your response MUST be in the requested JSON format.

IMPORTANT INSTRUCTIONS:
- The 'strengths' and 'weaknesses' fields must contain analysis in KOREAN, followed by a relevant example sentence quoted directly from the essay in ENGLISH.
- All other fields ('summaryInKorean', 'koreanAnalysis', 'overallSummary') MUST be written in KOREAN.

Essay to analyze:
{{{essay}}}`,
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
