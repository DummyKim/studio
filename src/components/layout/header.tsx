import { PenSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-border/50 bg-card/20 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center gap-3">
            <PenSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
            영작문 분석기 AI
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
