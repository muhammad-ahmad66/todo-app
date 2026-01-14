import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { TodoStats } from '@/features/todos/TodoStats';
import { Typography } from '@/components/ui/Typography';
import { UserInsights } from '@/features/dashboard/UserInsights';
import { QuickActions } from '@/features/dashboard/QuickActions';
import { AddTodoForm } from '@/features/todos/AddTodoForm';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { PortfolioCTA } from '@/components/PortfolioCTA';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { todos } = useAppSelector((state) => state.todos);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const completionRate = todos.length > 0
    ? Math.round((todos.filter(t => t.status === 'completed').length / todos.length) * 100)
    : 0;

  return (
    <PageContainer>
      <Breadcrumb />
      <div className="mb-6">
        <Typography variant="h1">Dashboard</Typography>
        <Typography variant="body" className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, {user?.firstName}! Here's your overview.
        </Typography>
      </div>

      <UserInsights />

      <div className="mt-6">
        <QuickActions onNewTodo={() => setIsFormOpen(true)} />
      </div>

      <div className="mt-6">
        <TodoStats />
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Recent Todos</Typography>
          {todos.slice(0, 5).length > 0 ? (
            <ul className="space-y-2">
              {todos.slice(0, 5).map((todo) => (
                <li
                  key={todo.id}
                  onClick={() => navigate(ROUTES.TODOS)}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-gray-100">{todo.title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${todo.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      todo.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                      {todo.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No todos yet</p>
          )}
        </Card>

        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Quick Stats</Typography>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Todos</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{todos.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Completed</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {todos.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">In Progress</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {todos.filter(t => t.status === 'in-progress').length}
              </span>
            </div>

            {/* Completion Rate Progress Bar */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{completionRate}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 rounded-full"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <PortfolioCTA />

      <AddTodoForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </PageContainer>
  );
};