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
    strengths: z.string().describe('이 영역에서 발견된 강점 (한국어로 작성).'),
    weaknesses: z.string().describe('이 영역에서 발견된 약점 (한국어로 작성).'),
    example: z.string().describe('An example sentence from the original essay that illustrates a point from the analysis, written in English.'),
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
- The 'example' field MUST be written in ENGLISH.
- All other fields ('summaryInKorean', 'koreanAnalysis', 'strengths', 'weaknesses', 'overallSummary') MUST be written in KOREAN.
- The 'example' field must contain a direct quote from the essay.

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
