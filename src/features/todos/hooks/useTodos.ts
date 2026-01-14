import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';
import { loadTodos } from '../todosSlice';

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { todos, isLoading, error, filters, sortBy, selectedTodos } = useAppSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (userId) {
      dispatch(loadTodos(userId));
    }
  }, [dispatch, userId]);

  return {
    todos,
    isLoading,
    error,
    filters,
    sortBy,
    selectedTodos,
    userId,
  };
};