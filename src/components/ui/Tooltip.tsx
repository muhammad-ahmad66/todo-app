import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95, y: position === 'bottom' ? -5 : position === 'top' ? 5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positions[position]} pointer-events-none`}
          >
            <div className="relative bg-gray-900 dark:bg-gray-800 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 max-w-[200px] break-words">
              {content}
              {position === 'top' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              )}
              {position === 'bottom' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900 dark:border-b-gray-800" />
              )}
              {position === 'left' && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-1 border-4 border-transparent border-l-gray-900 dark:border-l-gray-800" />
              )}
              {position === 'right' && (
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 -mr-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-800" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};