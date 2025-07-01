import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                뒤로가기
              </Button>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">활용 방법 안내</CardTitle>
            </CardHeader>
            <CardContent className="space-y-10 text-base md:text-lg">
              
              <div className="space-y-4">
                <h2 className="text-2xl font-headline font-semibold">영작문 분석기 AI 소개</h2>
                <div className="space-y-3 text-foreground/90">
                  <p>
                    영작문 분석기 AI는 학생이 영작한 글을 AI가 읽고 기준에 따라 학생 글의 강점과 약점을 분석합니다.
                  </p>
                  <p>
                    에세이 등 작문 과제는 학생의 영어 쓰기 능력을 판단하기에 좋지만 선생님들의 입장에서 수많은 학생들의 글을 모두 읽는데 너무나 많은 시간과 노력이 필요합니다.
                  </p>
                  <p>
                    AI 분석기를 통해 선생님들이 모든 글을 읽는 시간을 줄이고 학생의 글을 일목요연하게 확인할 수 있습니다.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full pt-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base hover:no-underline">네 가지 분석 영역의 구분 기준은 다음과 같습니다.</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-base bg-secondary/30 p-6 rounded-md">
                      <div className="prose prose-sm max-w-none">
                        <h3 className="font-semibold text-lg">내용</h3>
                        <ul className="mt-2 space-y-1">
                          <li>주제가 명확하게 드러나고 관련된 아이디어가 충분히 제시되었는가?</li>
                          <li>아이디어가 구체적이고 설득력 있게 전개되었는가?</li>
                        </ul>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <h3 className="font-semibold text-lg">구성</h3>
                        <ul className="mt-2 space-y-1">
                          <li>글의 전체 구조가 논리적이고 일관성 있게 짜여 있는가?</li>
                          <li>문단 간 연결이 자연스럽고 전환이 효과적인가?</li>
                        </ul>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <h3 className="font-semibold text-lg">문법</h3>
                        <ul className="mt-2 space-y-1">
                          <li>문장의 문법적 오류가 적은가?</li>
                          <li>의미를 전달하기 위해 정확한 문법이 사용되었는가?</li>
                        </ul>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <h3 className="font-semibold text-lg">어휘</h3>
                        <ul className="mt-2 space-y-1">
                          <li>의미를 정확하게 전달하는 어휘가 사용되었는가?</li>
                          <li>단순하고 반복적인 어휘 보다는 다채로운 어휘가 사용되었는가?</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-semibold">활용 방법</h2>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg">1. 글쓰기 평가 피드백 제공</h3>
                    <div className="space-y-3 text-foreground/90">
                      <p>
                        학생이 제출한 영작 과제물을 분석한 후, 분석된 강점과 약점을 중심으로 학생에게 피드백을 제공할 수 있습니다.
                      </p>
                      <p>
                        학생들이 피드백에 기반하여 초안을 수정하여 과정 중심 글쓰기 평가를 실시할 수 있습니다.
                      </p>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <h3 className="font-semibold text-lg">2. 생활기록부 교과 세특에 활용</h3>
                    <p className="text-foreground/90">
                      학생이 제출한 글의 영역별 강점과 약점을 요약하여 교과 세특 작성을 위한 자료로 활용할 수 있습니다. 학생이 직접 작성한 글을 근거로 사용하므로 개별화된 세특 작성이 가능하고 실제 학생의 능력을 기록할 수 있습니다.
                    </p>
                 </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
