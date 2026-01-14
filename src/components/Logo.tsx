import React from 'react';
import clsx from 'clsx';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className, showText = true }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Clipboard/Checklist Icon */}
      <svg
        className={clsx(sizes[size], 'text-primary-600 dark:text-primary-400')}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12L11 14L15 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="font-semibold text-xl bg-gradient-to-r from-gray-900 via-primary-700 to-primary-600 dark:from-gray-100 dark:via-primary-400 dark:to-primary-300 bg-clip-text text-transparent tracking-tight">
          TodoApp
        </span>
      )}
    </div>
  );
};