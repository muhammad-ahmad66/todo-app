import { apiRequests } from '../helpers/apiRequests';
import { API_ENDPOINTS } from '@/utils/constants';
import { User, AuthResponse, LoginCredentials, SignupCredentials } from '@/types/auth.types';
import { usersStorage } from '@/utils/storage';

export const userApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiRequests.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response;
    } catch (error: any) {
      // Check local storage for user first
      const users = usersStorage.getAll();
      const localUser = Object.values(users).find(u => u.username === credentials.username);

      if (localUser) {
        return {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          image: localUser.image,
          token: `local-token-${Date.now()}`,
        };
      }

      // Fallback: Create mock user for offline mode
      if (error.status === 0 || error.message?.includes('Network')) {
        return {
          id: `mock-${Date.now()}`,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          firstName: credentials.username,
          lastName: 'User',
          token: `mock-token-${Date.now()}`,
        };
      }
      throw error;
    }
  },

  /**
   * Register new user
   */
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiRequests.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );
      return response;
    } catch (error: any) {
      // Fallback: Create mock user for offline mode
      if (error.status === 0 || error.message?.includes('Network')) {
        return {
          id: `mock-${Date.now()}`,
          username: credentials.username,
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          token: `mock-token-${Date.now()}`,
        };
      }
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await apiRequests.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
      return response;
    } catch (error: any) {
      // Fallback: Return mock user
      if (error.status === 0 || error.message?.includes('Network')) {
        return {
          id,
          username: 'mockuser',
          email: 'mock@example.com',
          firstName: 'Mock',
          lastName: 'User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },

  /**
   * Search users
   */
  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const response = await apiRequests.get<{ users: User[] }>(
        `${API_ENDPOINTS.USERS.SEARCH}?q=${encodeURIComponent(query)}`
      );
      return response.users || [];
    } catch (error: any) {
      // Fallback: Return empty array
      if (error.status === 0 || error.message?.includes('Network')) {
        return [];
      }
      throw error;
    }
  },

  /**
   * Update user
   */
  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    try {
      const response = await apiRequests.put<User>(
        API_ENDPOINTS.USERS.BY_ID(id),
        updates
      );
      return response;
    } catch (error: any) {
      // Fallback: Return updated mock user
      if (error.status === 0 || error.message?.includes('Network')) {
        return {
          id,
          username: updates.username || 'mockuser',
          email: updates.email || 'mock@example.com',
          firstName: updates.firstName || 'Mock',
          lastName: updates.lastName || 'User',
          image: updates.image,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};