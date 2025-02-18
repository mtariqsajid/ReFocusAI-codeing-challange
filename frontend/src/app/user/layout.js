'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`pt-16 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-[margin] duration-200`}>
        <main className="p-4 md:p-6 min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
