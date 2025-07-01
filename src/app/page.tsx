'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import EssayForm from '@/components/essay-form';
import AnalysisResult from '@/components/analysis-result';
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyzeEssayOutput } from '@/ai/flows/analyze-essay';
import { getAnalysis } from './actions';
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from 'lucide-react';

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
        title: "Analysis Error",
        description: error,
      });
    } else {
      setAnalysis(result);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold text-primary">에세이 입력</h2>
              <p className="text-muted-foreground">
                학생의 에세이를 아래 상자에 붙여넣고 '분석' 버튼을 클릭하여 AI 기반 피드백을 받으세요.
              </p>
            </div>
            <EssayForm onSubmit={handleAnalysis} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2">
            {isLoading && <LoadingSkeleton />}
            {analysis && <AnalysisResult analysis={analysis} />}
            {!isLoading && !analysis && <Placeholder />}
          </div>
        </div>
      </main>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-20 w-full" />
    </div>
    <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-48 w-full" />
    </div>
     <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-card/50 rounded-lg border-2 border-dashed border-border">
        <div className="p-4 bg-accent rounded-full mb-4">
            <Sparkles className="h-10 w-10 text-primary" />
        </div>
        <h3 className="mt-4 text-2xl font-headline font-semibold text-foreground">
            Awaiting Analysis Results
        </h3>
        <p className="mt-2 text-muted-foreground max-w-sm">
            Once you submit an essay for analysis, the AI-powered feedback will appear here.
        </p>
    </div>
);
