'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export default function Header({ onMenuClick }) {

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-50">
      {/* Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <Button onClick={onMenuClick} className="p-2 rounded-lg">
          <Menu className="w-6 h-6" />
        </Button>
        <Link href="/" className="flex items-center group">
          <div className="flex items-center">
            <span className="text-xl font-black flex items-center relative font-poppins">
              <span className="text-black tracking-tight">REFOCUS</span>
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
