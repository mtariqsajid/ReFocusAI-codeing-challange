'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users } from 'lucide-react';

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Users',
      href: '/user/all',
      icon: Users,
    },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <div className={`fixed inset-0 bg-gray-900/50 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`} />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)]
          bg-white border-r border-gray-200
          transition-all duration-200 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'}
          transform lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-x-3 px-3 py-2 rounded-lg
                    hover:bg-gray-100 transition-colors
                    ${pathname === item.href ? 'bg-gray-100' : ''}
                  `}
                >
                  <item.icon className="w-6 h-6" />
                  <span className={!isOpen ? 'lg:hidden' : ''}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
