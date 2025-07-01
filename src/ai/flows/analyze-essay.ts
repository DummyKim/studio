// src/ai/flows/analyze-essay.ts
'use server';
/**
 * @fileOverview 에세이를 미리 정의된 기준에 따라 분석함.
 *
 * - analyzeEssay - 에세이 분석 프로세스를 처리하는 함수.
 * - AnalyzeEssayInput - analyzeEssay 함수의 입력 타입.
 * - AnalyzeEssayOutput - analyzeEssay 함수의 반환 타입.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEssayInputSchema = z.object({
  essay: z.string().describe('분석할 에세이.'),
});
export type AnalyzeEssayInput = z.infer<typeof AnalyzeEssayInputSchema>;

const StrengthWeaknessSchema = z.object({
  description: z.string().describe('이 영역에서 발견된 점의 설명 (한국어로 작성, "음슴체"로).'),
  example: z.string().describe('설명을 뒷받침하는 에세이의 직접적인 인용문 (영어로 작성).'),
});

const AnalysisDetailSchema = z.object({
    koreanAnalysis: z.string().describe('해당 분석 영역(내용, 구성, 문법, 어휘)에 대한 1-2 문장의 한국어 요약 설명. 모든 응답은 "음슴체"로 끝나야 함. 예: ~하였음, ~임.'),
    strengths: StrengthWeaknessSchema.describe('이 영역에서 발견된 강점.'),
    weaknesses: StrengthWeaknessSchema.describe('이 영역에서 발견된 약점.'),
});

const AnalyzeEssayOutputSchema = z.object({
    summaryInKorean: z.string().describe('에세이 내용을 3-5 문장의 한국어로 요약. "음슴체"로 끝나야 함.'),
    contentAnalysis: AnalysisDetailSchema.describe('에세이 내용 분석.'),
    structureAnalysis: AnalysisDetailSchema.describe('에세이 구성 분석.'),
    grammarAnalysis: AnalysisDetailSchema.describe('에세이 문법 분석.'),
    vocabularyAnalysis: AnalysisDetailSchema.describe('에세이 어휘 분석.'),
    overallSummary: z.string().describe('분석 전반에 대한 4-6 문장의 종합적인 한국어 요약. "음슴체"로 끝나야 함.'),
});
export type AnalyzeEssayOutput = z.infer<typeof AnalyzeEssayOutputSchema>;

export async function analyzeEssay(input: AnalyzeEssayInput): Promise<AnalyzeEssayOutput> {
  return analyzeEssayFlow(input);
}

const analyzeEssayPrompt = ai.definePrompt({
  name: 'analyzeEssayPrompt',
  input: {schema: AnalyzeEssayInputSchema},
  output: {schema: AnalyzeEssayOutputSchema},
  prompt: `당신은 한국인 교사를 위한 전문 에세이 평가관임. 내용, 구조, 문법, 어휘를 바탕으로 다음 에세이를 분석해야 함.

중요 지침:
- 최종 응답은 반드시 요청된 JSON 형식을 따라야 함.
- 'example' 필드는 반드시 에세이에서 직접 인용한 영어 문장이어야 함.
- 다른 모든 필드('summaryInKorean', 'koreanAnalysis', 'strengths.description', 'weaknesses.description', 'overallSummary')는 반드시 한국어 "음슴체"로 작성해야 함. (예: ~함, ~였음, ~임).
- 강점과 약점에 대한 'example'은 'description'을 뒷받침하는 직접적인 인용문이어야 함.

분석할 에세이:
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
