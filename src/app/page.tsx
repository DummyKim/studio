'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import EssayForm from '@/components/essay-form';
import AnalysisResult from '@/components/analysis-result';
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyzeEssayOutput } from '@/ai/flows/analyze-essay';
import { getAnalysis } from './actions';
import { useToast } from "@/hooks/use-toast";

const placeholderAnalysis: AnalyzeEssayOutput = {
  summaryInKorean: 'AI가 생성한 한국어 요약이 이곳에 표시됩니다.',
  contentAnalysis: {
    koreanAnalysis: '에세이의 주제 명확성, 아이디어의 관련성 및 구체성에 대한 분석이 여기에 제공됩니다.',
    strengths: [{
      description: '내용 구성의 강점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }],
    weaknesses: [{
      description: '내용 구성의 약점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }]
  },
  structureAnalysis: {
    koreanAnalysis: '글의 전체 구조, 문단 간의 논리적 연결성 및 전환의 효과성에 대한 분석이 제공됩니다.',
    strengths: [{
      description: '구조의 강점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }],
    weaknesses: [{
      description: '구조의 약점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }]
  },
  grammarAnalysis: {
    koreanAnalysis: '문법적 정확성과 문법 구조 사용의 적절성에 대한 분석이 제공됩니다.',
    strengths: [{
      description: '문법의 강점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }],
    weaknesses: [{
      description: '문법의 약점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }]
  },
  vocabularyAnalysis: {
    koreanAnalysis: '어휘의 정확성, 다양성 및 적절성에 대한 분석이 제공됩니다.',
    strengths: [{
      description: '어휘의 강점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }],
    weaknesses: [{
      description: '어휘의 약점에 대한 설명이 여기에 표시됩니다.',
      example: '분석 후 학생의 글에서 가져온 예시 문장이 여기에 나타납니다.'
    }]
  },
  overallSummary: '모든 분석 영역을 종합한 최종 요약 및 제언이 여기에 표시됩니다.'
};


export default function Home() {
  const [analysis, setAnalysis] = useState<AnalyzeEssayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async (data: { essay: string }) => {
    setIsLoading(true);
    setAnalysis(null);
    const { result, error } = await getAnalysis(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "분석 오류",
        description: error,
      });
    } else {
      setAnalysis(result);
    }
    setIsLoading(false);
  };

  const displayAnalysis = analysis || placeholderAnalysis;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold text-primary">학생 글 입력</h2>
              <p className="text-muted-foreground">
                학생의 글을 아래 상자에 붙여넣거나 사진 파일을 업로드한 후, '분석하기' 버튼을 클릭하여 AI 기반 피드백을 받으세요.
              </p>
            </div>
            <EssayForm onSubmit={handleAnalysis} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-3">
            {isLoading ? <LoadingSkeleton /> : <AnalysisResult analysis={displayAnalysis} />}
          </div>
        </div>
      </main>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
    </div>
    <div className="space-y-4">
        <Skeleton className="h-10 w-full md:w-2/3" />
        <Skeleton className="h-64 w-full" />
    </div>
     <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
    </div>
  </div>
);
