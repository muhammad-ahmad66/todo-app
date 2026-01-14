import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const loader = (
    <div className="flex items-center justify-center">
      <motion.div
        className={`relative ${sizes[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-900 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 rounded-full"></div>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="text-center">
          {loader}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 dark:text-gray-400 font-medium"
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  return loader;
};