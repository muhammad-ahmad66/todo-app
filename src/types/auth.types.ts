export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  token: string;
}