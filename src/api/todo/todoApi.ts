import { apiRequests } from '../helpers/apiRequests';
import { API_ENDPOINTS } from '@/utils/constants';
import { Todo } from '@/types/todo.types';

/**
 * External todo API calls
 * Note: DummyJSON doesn't have todos endpoint in the same format,
 * so this is a placeholder for future external integrations
 */

export const todoApi = {
  /**
   * Fetch todos from external API (if available)
   */
  fetchTodos: async (userId: string): Promise<Todo[]> => {
    try {
      // DummyJSON doesn't have todos endpoint, so this is a fallback
      // In a real app, you'd replace this with your actual API endpoint
      const response = await apiRequests.get<{ todos: Todo[] }>(
        `${API_ENDPOINTS.TODOS.BY_USER(userId)}`
      );
      return response.todos || [];
    } catch (error: any) {
      // Fallback: Return empty array
      if (error.status === 0 || error.message?.includes('Network')) {
        return [];
      }
      throw error;
    }
  },

  /**
   * Create todo in external API
   */
  createTodo: async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
    try {
      const response = await apiRequests.post<Todo>(API_ENDPOINTS.TODOS.BASE, todo);
      return response;
    } catch (error: any) {
      // Fallback: Return mock todo
      if (error.status === 0 || error.message?.includes('Network')) {
        return {
          ...todo,
          id: `mock-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },

  /**
   * Update todo in external API
   */
  updateTodo: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    try {
      const response = await apiRequests.put<Todo>(API_ENDPOINTS.TODOS.BY_ID(id), updates);
      return response;
    } catch (error: any) {
      // Fallback: Return updated mock todo
      if (error.status === 0 || error.message?.includes('Network')) {
        throw new Error('Network error: Cannot update todo');
      }
      throw error;
    }
  },

  /**
   * Delete todo from external API
   */
  deleteTodo: async (id: string): Promise<void> => {
    try {
      await apiRequests.delete(API_ENDPOINTS.TODOS.BY_ID(id));
    } catch (error: any) {
      // Fallback: Silently fail for offline mode
      if (error.status === 0 || error.message?.includes('Network')) {
        return;
      }
      throw error;
    }
  },
};