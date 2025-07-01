'use client';

import type { AnalyzeEssayOutput } from "@/ai/flows/analyze-essay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookText, Component, SpellCheck, BrainCircuit, CheckCircle, XCircle, Languages, MessageSquareQuote, HelpCircle, Lightbulb } from "lucide-react";

type AnalysisDetail = AnalyzeEssayOutput['contentAnalysis'];

const AnalysisDetailCard = ({ koreanAnalysis, strengths, weaknesses }: AnalysisDetail) => (
  <div className="space-y-4 pt-4">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>주요 피드백</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground whitespace-pre-wrap">{koreanAnalysis}</p>
      </CardContent>
    </Card>

    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>강점</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {strengths.example && (
          <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
            <p className="whitespace-pre-wrap">{strengths.example}</p>
          </blockquote>
        )}
        <p className="text-muted-foreground whitespace-pre-wrap">{strengths.description}</p>
      </CardContent>
    </Card>
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <XCircle className="h-5 w-5 text-destructive" />
          <span>약점</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weaknesses.example && (
          <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
            <p className="whitespace-pre-wrap">{weaknesses.example}</p>
          </blockquote>
        )}
        <p className="text-muted-foreground whitespace-pre-wrap">{weaknesses.description}</p>
      </CardContent>
    </Card>
  </div>
);

const AnalysisInfoTooltip = ({ text }: { text: React.ReactNode }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger onClick={(e) => e.preventDefault()} asChild>
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const AnalysisResult = ({ analysis }: { analysis: AnalyzeEssayOutput }) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
            <Languages className="h-6 w-6 text-primary" />
            <span>우리말 요약</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{analysis.summaryInKorean}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">상세 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="content" className="gap-1.5">
                <BookText className="h-4 w-4" />
                <span>내용</span>
                <AnalysisInfoTooltip text={<><p>• 주제가 명확하게 드러나고, 관련된 아이디어가 충분히 제시되었는가?</p><p>• 아이디어가 구체적이고 설득력 있게 전개되었는가?</p></>} />
              </TabsTrigger>
              <TabsTrigger value="structure" className="gap-1.5">
                <Component className="h-4 w-4" />
                <span>구성</span>
                <AnalysisInfoTooltip text={<><p>• 글의 전체 구조가 논리적이고 일관성 있게 짜여 있는가?</p><p>• 문단 간 연결이 자연스럽고 전환이 효과적인가?</p></>} />
              </TabsTrigger>
              <TabsTrigger value="grammar" className="gap-1.5">
                <SpellCheck className="h-4 w-4" />
                <span>문법</span>
                <AnalysisInfoTooltip text={<><p>• 문장의 문법적 오류가 적은가?</p><p>• 의미를 전달하기 위해 정확한 문법이 사용되었는가?</p></>} />
              </TabsTrigger>
              <TabsTrigger value="vocabulary" className="gap-1.5">
                <BrainCircuit className="h-4 w-4" />
                <span>어휘</span>
                <AnalysisInfoTooltip text={<><p>• 의미를 정확하게 전달하는 어휘가 사용되었는가?</p><p>• 단순하고 반복적인 어휘 보다는 다채로운 어휘가 사용되었는가?</p></>} />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
                <AnalysisDetailCard {...analysis.contentAnalysis} />
            </TabsContent>
            <TabsContent value="structure">
                <AnalysisDetailCard {...analysis.structureAnalysis} />
            </TabsContent>
            <TabsContent value="grammar">
                <AnalysisDetailCard {...analysis.grammarAnalysis} />
            </TabsContent>
            <TabsContent value="vocabulary">
                <AnalysisDetailCard {...analysis.vocabularyAnalysis} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
            <MessageSquareQuote className="h-6 w-6 text-primary" />
            <span>분석 요약</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{analysis.overallSummary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResult;
