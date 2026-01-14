import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Todo } from '@/types/todo.types';
import { updateTodo, deleteTodo, toggleTodoSelection } from './todosSlice';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { formatSmartDate, formatPriority } from '@/utils/formatters';
import { isOverdue } from '@/utils/helpers';
import { CheckCircle2, Circle, Trash2, Edit2, Calendar, AlertCircle } from 'lucide-react';
import { TODO_PRIORITIES, TODO_STATUSES } from '@/utils/constants';
import { showToast } from '@/components/ui/Toast';
import clsx from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { selectedTodos } = useAppSelector((state) => state.todos);
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = selectedTodos.includes(todo.id);
  const priority = TODO_PRIORITIES.find(p => p.value === todo.priority);
  const status = TODO_STATUSES.find(s => s.value === todo.status);
  const overdue = todo.dueDate && isOverdue(todo.dueDate);

  const handleToggleComplete = () => {
    if (!userId) return;

    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    dispatch(updateTodo({
      userId,
      todoId: todo.id,
      updates: {
        status: newStatus,
        completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
      },
    }));
    showToast.success(newStatus === 'completed' ? 'Todo marked as completed!' : 'Todo marked as pending');
  };

  const handleDelete = () => {
    if (!userId) return;
    if (confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo({ userId, todoId: todo.id }));
      showToast.success('Todo deleted successfully!');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(todo);
    }
  };

  const handleToggleSelect = () => {
    dispatch(toggleTodoSelection(todo.id));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div onClick={handleToggleSelect}>
        <Card
          className={clsx(
            'transition-all duration-200 cursor-pointer',
            isSelected && 'ring-2 ring-primary-500',
            overdue && 'border-red-300 dark:border-red-700',
            todo.status === 'completed' && 'opacity-75'
          )}
          padding="md"
          hover
        >
          <div className="flex items-start gap-4">
            <Tooltip content={todo.status === 'completed' ? 'Mark as pending' : 'Mark as complete'} position="top">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleComplete();
                }}
                className="mt-0.5 flex-shrink-0"
              >
                {todo.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 hover:text-primary-500 transition-colors" />
                )}
              </button>
            </Tooltip>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3
                    className={clsx(
                      'font-semibold text-gray-900 dark:text-gray-100',
                      todo.status === 'completed' && 'line-through text-gray-500 dark:text-gray-400'
                    )}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {todo.description}
                    </p>
                  )}
                </div>

                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant={status?.color as any} size="sm">
                  {status?.label}
                </Badge>
                <Badge
                  variant={priority?.color as any}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <span>{priority?.icon}</span>
                  {formatPriority(todo.priority)}
                </Badge>
                {todo.category && (
                  <Badge variant="info" size="sm">
                    {todo.category}
                  </Badge>
                )}
                {todo.dueDate && (
                  <div className={clsx(
                    'flex items-center gap-1 text-xs',
                    overdue ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                  )}>
                    {overdue ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : (
                      <Calendar className="w-3 h-3" />
                    )}
                    {formatSmartDate(todo.dueDate)}
                  </div>
                )}
              </div>

              {todo.subtasks && todo.subtasks.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {todo.subtasks.filter(s => s.completed).length} / {todo.subtasks.length} subtasks completed
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};