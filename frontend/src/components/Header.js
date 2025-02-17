'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

export default function Header({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-50">
      {/* Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <Link href="/" className="flex items-center group">
          <div className="flex items-center">
            <span className="text-xl font-black flex items-center relative font-poppins">
              <span className="bg-black text-white px-2 py-0.5 rounded-sm">RE</span>
              <span className="relative ml-1.5">
                <span className="text-black tracking-tight">FOCUS</span>
                <span className="absolute -right-1 -top-0.5 w-1 h-1 bg-black rounded-full"></span>
              </span>
            </span>
          </div>
        </Link>
      </div>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="hidden md:block font-medium">Hi, admin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all">
              <UserIcon className="w-5 h-5" />
            </div>
          </button>

          {/* {isProfileOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </header>
  );
}
