import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_ENDPOINTS } from '@/utils/constants';
import { ApiError } from '@/types/api.types';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const authData = localStorage.getItem('persist:root');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const authState = JSON.parse(parsed.auth || '{}');
        if (authState.token) {
          config.headers.Authorization = `Bearer ${authState.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle common errors
    if (error.response) {
      const apiError: ApiError = {
        message: error.response.data?.message || error.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data?.errors,
      };
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Clear auth data
        localStorage.removeItem('persist:root');
        window.location.href = '/login';
      }
      
      return Promise.reject(apiError);
    }
    
    if (error.request) {
      const networkError: ApiError = {
        message: 'Network error. Please check your connection.',
        status: 0,
      };
      return Promise.reject(networkError);
    }
    
    return Promise.reject(error);
  }
);

// Generic request methods
export const apiRequests = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data as T);
  },

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T>(url, data, config).then((response) => response.data as T);
  },

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<T>(url, data, config).then((response) => response.data as T);
  },

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch<T>(url, data, config).then((response) => response.data as T);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<T>(url, config).then((response) => response.data as T);
  },
};

export default apiClient;