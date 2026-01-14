import React from 'react';
import { Logo } from '../Logo';
import { ROUTES } from '@/utils/constants';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" showText />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built by{' '}
            <a
              href="https://mdotahmad.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              Muhammad Ahmad
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <div className="flex gap-4 text-sm">
            <Link to={ROUTES.DASHBOARD} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Dashboard
            </Link>
            <Link to={ROUTES.CONTACT} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};