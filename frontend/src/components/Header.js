'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export default function Header({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 md:px-6 z-50">
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          onClick={onMenuClick}
          variant="ghost"
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <Link href="/" className="flex items-center group">
          <span className="text-lg md:text-xl font-black tracking-tight">
            REFOCUS
          </span>
        </Link>
      </div>
    </header>
  );
}
