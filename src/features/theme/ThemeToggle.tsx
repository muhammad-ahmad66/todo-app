import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from './themeSlice';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => dispatch(toggleTheme())}
      className="p-2"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: mode === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.div>
    </Button>
  );
};