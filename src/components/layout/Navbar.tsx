import Link from 'next/link';
import { Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Boxes className="h-7 w-7" />
          <h1 className="text-2xl font-bold font-headline">Thok Wali Shop</h1>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
