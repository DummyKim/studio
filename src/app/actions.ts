'use server';

import { analyzeEssay, type AnalyzeEssayInput, type AnalyzeEssayOutput } from '@/ai/flows/analyze-essay';

export async function getAnalysis(
  data: AnalyzeEssayInput
): Promise<{ result: AnalyzeEssayOutput | null; error: string | null }> {
  try {
    if (!data.essay || data.essay.trim().length < 50) {
      return { result: null, error: '50자 이상의 에세이를 입력해주세요.' };
    }
    if (data.essay.trim().length > 10000) {
        return { result: null, error: '에세이는 10,000자를 초과할 수 없습니다.' };
    }

    const result = await analyzeEssay({ essay: data.essay });
    return { result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    return { result: null, error: `에세이 분석에 실패했습니다. ${errorMessage}` };
  }
}
