import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.DASHBOARD}>
          <Button variant="primary" size="lg" leftIcon={<Home className="w-5 h-5" />}>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};