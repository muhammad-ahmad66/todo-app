import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { loadTodos, clearSelection } from './todosSlice';
import { TodoItem } from './TodoItem';
import { Todo } from '@/types/todo.types';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { filterTodos, sortTodos } from '@/utils/helpers';

interface TodoListProps {
  onEditTodo?: (todo: Todo) => void;
  onAddTodo?: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ onEditTodo, onAddTodo }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { todos, isLoading, filters, sortBy } = useAppSelector((state) => state.todos);

  useEffect(() => {
    if (userId) {
      dispatch(loadTodos(userId));
    }
  }, [dispatch, userId]);

  const filteredAndSortedTodos = useMemo(() => {
    if (!todos.length) return [];

    const filtered = filterTodos(todos, filters);
    return sortTodos(filtered, sortBy);
  }, [todos, filters, sortBy]);

  useEffect(() => {
    return () => {
      dispatch(clearSelection());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height={80} className="rounded-lg" />
        ))}
      </div>
    );
  }

  if (filteredAndSortedTodos.length === 0) {
    return (
      <EmptyState
        title={todos.length === 0 ? 'No todos yet' : 'No todos match your filters'}
        description={
          todos.length === 0
            ? 'Start organizing your tasks by creating your first todo'
            : 'Try adjusting your filters or create a new todo'
        }
        action={onAddTodo ? {
          label: todos.length === 0 ? 'Create Your First Todo' : 'Add New Todo',
          onClick: onAddTodo,
        } : undefined}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredAndSortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEditTodo} />
      ))}
    </div>
  );
};