import React from 'react';
import { FileText, Search, Inbox, CheckCircle2, Plus } from 'lucide-react';
import { Button } from './ui/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  const defaultIcons = {
    todos: <FileText className="w-16 h-16 text-gray-400" />,
    search: <Search className="w-16 h-16 text-gray-400" />,
    inbox: <Inbox className="w-16 h-16 text-gray-400" />,
    completed: <CheckCircle2 className="w-16 h-16 text-green-400" />,
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full blur-2xl opacity-50" />
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-full p-6">
          {icon || defaultIcons.todos}
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <Button
            onClick={action.onClick}
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};