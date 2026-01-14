import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import clsx from 'clsx';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-600 focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        <span className="text-gray-900 dark:text-gray-100">
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon}
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={clsx(
            'w-5 h-5 text-gray-400 transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[60] w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(option.value);
                  setIsOpen(false);
                }}
                disabled={option.disabled}
                className={clsx(
                  'w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  value === option.value && 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};