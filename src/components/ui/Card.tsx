import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
        paddings[padding],
        hover && 'transition-all duration-200 hover:shadow-md hover:border-primary-300 dark:hover:border-primary-700',
        className
      )}
    >
      {children}
    </div>
  );
};