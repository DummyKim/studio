'use client';

import type { AnalyzeEssayOutput } from "@/ai/flows/analyze-essay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, Component, SpellCheck, BrainCircuit, CheckCircle, XCircle, Quote, Languages, FileText, MessageSquareQuote } from "lucide-react";

type AnalysisResultProps = {
  analysis: AnalyzeEssayOutput;
};

const AnalysisDetailCard = ({ strengths, weaknesses, example }: { strengths: string; weaknesses: string; example: string; }) => (
  <div className="space-y-4 pt-4">
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>강점</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{strengths}</p>
      </CardContent>
    </Card>
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <XCircle className="h-5 w-5 text-destructive" />
          <span>약점</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{weaknesses}</p>
      </CardContent>
    </Card>
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <Quote className="h-5 w-5 text-primary" />
          <span>에세이 예시</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
          {example}
        </blockquote>
      </CardContent>
    </Card>
  </div>
);

const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
            <FileText className="h-6 w-6 text-primary" />
            <span>간략한 요약</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
            <Languages className="h-6 w-6 text-primary" />
            <span>한국어 요약</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.summaryInKorean}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-headline">상세 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="content"><BookText className="mr-2" />내용</TabsTrigger>
              <TabsTrigger value="structure"><Component className="mr-2" />구조</TabsTrigger>
              <TabsTrigger value="grammar"><SpellCheck className="mr-2" />문법</TabsTrigger>
              <TabsTrigger value="vocabulary"><BrainCircuit className="mr-2" />어휘</TabsTrigger>
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
            <span>종합 요약</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{analysis.overallSummary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResult;
