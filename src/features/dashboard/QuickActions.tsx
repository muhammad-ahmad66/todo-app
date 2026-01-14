import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, BarChart3, Settings, User } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

interface QuickActionsProps {
  onNewTodo?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNewTodo }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Todo',
      icon: <Plus className="w-5 h-5" />,
      onClick: onNewTodo || (() => navigate(ROUTES.TODOS)),
      variant: 'primary' as const,
    },
    {
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      onClick: () => navigate(ROUTES.ANALYTICS),
      variant: 'outline' as const,
    },
    {
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      onClick: () => navigate(ROUTES.PROFILE),
      variant: 'outline' as const,
    },
    {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      onClick: () => navigate(ROUTES.SETTINGS),
      variant: 'outline' as const,
    },
  ];

  return (
    <Card padding="md">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="md"
            onClick={action.onClick}
            leftIcon={action.icon}
            className="w-full"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};