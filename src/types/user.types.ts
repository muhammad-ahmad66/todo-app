export interface UserProfile extends Omit<import('./auth.types').User, 'id'> {
  id: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  bio?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailNotifications: boolean;
  defaultPriority: import('./todo.types').TodoPriority;
  defaultCategory: string;
  language: string;
  timezone: string;
}

export interface UserInsights {
  totalTodos: number;
  completedTodos: number;
  productivityScore: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  weeklyStats: WeeklyStats[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface WeeklyStats {
  week: string;
  todosCreated: number;
  todosCompleted: number;
  productivityScore: number;
}