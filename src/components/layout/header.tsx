'use client';

import { usePathname } from 'next/navigation';
import { PenSquare, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  const pathname = usePathname();
  const isGuidePage = pathname === '/guide';

  return (
    <header className="py-4 px-4 md:px-6 border-b border-border/50 bg-card/20 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <PenSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
            English Composition Analyzer AI
            </h1>
          </Link>
          {!isGuidePage && (
            <Link href="/guide">
              <Button variant="outline">
                <Info className="mr-2 h-4 w-4" />
                활용 방법
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
