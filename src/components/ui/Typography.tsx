import React from 'react';
import clsx from 'clsx';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className,
  as,
}) => {
  const variants = {
    h1: 'text-4xl font-bold font-heading',
    h2: 'text-3xl font-bold font-heading',
    h3: 'text-2xl font-bold font-heading',
    h4: 'text-xl font-semibold font-heading',
    h5: 'text-lg font-semibold font-heading',
    h6: 'text-base font-semibold font-heading',
    body: 'text-base font-normal',
    small: 'text-sm font-normal',
    caption: 'text-xs font-normal text-gray-500 dark:text-gray-400',
  };

  const Component = as || (variant.startsWith('h') ? variant : 'p');

  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
};