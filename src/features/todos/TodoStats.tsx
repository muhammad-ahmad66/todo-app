import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { TodoStats as TodoStatsType } from '@/types/todo.types';
import { CheckCircle2, Clock, Archive, ListTodo, TrendingUp } from 'lucide-react';

export const TodoStats: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todos);

  const stats = useMemo(() => {
    const total = todos.length;
    const pending = todos.filter(t => t.status === 'pending').length;
    const inProgress = todos.filter(t => t.status === 'in-progress').length;
    const completed = todos.filter(t => t.status === 'completed').length;
    const archived = todos.filter(t => t.status === 'archived').length;

    const byPriority = {
      low: todos.filter(t => t.priority === 'low').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      high: todos.filter(t => t.priority === 'high').length,
      urgent: todos.filter(t => t.priority === 'urgent').length,
    };

    const byCategory: Record<string, number> = {};
    todos.forEach(todo => {
      byCategory[todo.category] = (byCategory[todo.category] || 0) + 1;
    });

    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      archived,
      byPriority,
      byCategory,
      completionRate,
    } as TodoStatsType;
  }, [todos]);

  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: <ListTodo className="w-5 h-5" />,
      color: 'text-gray-600 dark:text-gray-400',
      bg: 'bg-gray-100 dark:bg-gray-800',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: <Archive className="w-5 h-5" />,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
        >
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex-shrink-0`}>
            {stat.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};