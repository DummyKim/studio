import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

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
            <CardContent className="space-y-6 text-base md:text-lg">
              <p>
                이곳에 AI 영작문 분석기 활용 방법에 대한 상세한 안내가 표시될 예정입니다.
              </p>
              <p>
                예를 들어, 어떤 종류의 글을 분석하면 좋은지, 분석 결과를 어떻게 해석하고 학생 지도에 활용할 수 있는지 등에 대한 팁이 포함될 수 있습니다.
              </p>
              <p>
                현재는 내용을 준비 중입니다. 잠시만 기다려주세요!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
