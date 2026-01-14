import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { useIsMobile } from '@/hooks/useMediaQuery';

export const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${isMobile ? 'pb-20' : 'md:ml-64'}`}>
          <Outlet />
        </main>
      </div>
      {!isMobile && <Footer />}
    </div>
  );
};