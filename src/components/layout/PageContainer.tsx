import React from 'react';
import clsx from 'clsx';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  padding = true,
}) => {
  return (
    <div
      className={clsx(
        'min-h-[calc(100vh-4rem)]',
        padding && 'p-4 md:p-6 lg:p-8',
        className
      )}
    >
      {children}
    </div>
  );
};