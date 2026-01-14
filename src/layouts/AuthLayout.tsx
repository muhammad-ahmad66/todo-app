import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '@/components/Logo';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" showText />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};