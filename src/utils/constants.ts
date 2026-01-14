export const APP_NAME = 'TodoApp';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  TODOS: '/todos',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  CONTACT: '/contact',
  NOT_FOUND: '/404',
} as const;

export const STORAGE_KEYS = {
  AUTH: 'todoapp_auth',
  THEME: 'todoapp_theme',
  TODOS: 'todoapp_todos',
  USERS: 'todoapp_users',
  USER_PREFERENCES: 'todoapp_user_preferences',
  BACKUP: 'todoapp_backup',
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'https://dummyjson.com',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/users/add',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    SEARCH: '/users/search',
  },
  TODOS: {
    BASE: '/todos',
    BY_ID: (id: string) => `/todos/${id}`,
    BY_USER: (userId: string) => `/todos/user/${userId}`,
  },
} as const;

export const TODO_STATUSES: Array<{
  value: import('../types/todo.types').TodoStatus;
  label: string;
  color: string;
}> = [
  { value: 'pending', label: 'Pending', color: 'gray' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'archived', label: 'Archived', color: 'purple' },
];

export const TODO_PRIORITIES: Array<{
  value: import('../types/todo.types').TodoPriority;
  label: string;
  color: string;
  icon: string;
}> = [
  { value: 'low', label: 'Low', color: 'gray', icon: '↓' },
  { value: 'medium', label: 'Medium', color: 'yellow', icon: '→' },
  { value: 'high', label: 'High', color: 'orange', icon: '↑' },
  { value: 'urgent', label: 'Urgent', color: 'red', icon: '↑↑' },
];

export const CATEGORIES = [
  { name: 'Personal', color: '#6366f1' },
  { name: 'Work', color: '#10b981' },
  { name: 'Shopping', color: '#f59e0b' },
  { name: 'Health', color: '#ef4444' },
  { name: 'Learning', color: '#8b5cf6' },
  { name: 'Travel', color: '#06b6d4' },
  { name: 'Finance', color: '#84cc16' },
  { name: 'Other', color: '#64748b' },
];

export const ACHIEVEMENTS = [
  {
    id: 'first_todo',
    title: 'First Step',
    description: 'Create your first todo',
    icon: '🎯',
    target: 1,
  },
  {
    id: 'ten_todos',
    title: 'Getting Started',
    description: 'Create 10 todos',
    icon: '✨',
    target: 10,
  },
  {
    id: 'fifty_todos',
    title: 'Productive',
    description: 'Create 50 todos',
    icon: '🚀',
    target: 50,
  },
  {
    id: 'hundred_todos',
    title: 'Power User',
    description: 'Create 100 todos',
    icon: '💪',
    target: 100,
  },
  {
    id: 'first_complete',
    title: 'Done!',
    description: 'Complete your first todo',
    icon: '✅',
    target: 1,
  },
  {
    id: 'ten_complete',
    title: 'On a Roll',
    description: 'Complete 10 todos',
    icon: '🔥',
    target: 10,
  },
  {
    id: 'fifty_complete',
    title: 'Achiever',
    description: 'Complete 50 todos',
    icon: '🏆',
    target: 50,
  },
  {
    id: 'hundred_complete',
    title: 'Champion',
    description: 'Complete 100 todos',
    icon: '👑',
    target: 100,
  },
  {
    id: 'streak_3',
    title: 'Hot Streak',
    description: '3 day completion streak',
    icon: '🔥',
    target: 3,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: '7 day completion streak',
    icon: '⭐',
    target: 7,
  },
  {
    id: 'streak_30',
    title: 'Month Master',
    description: '30 day completion streak',
    icon: '🌟',
    target: 30,
  },
  {
    id: 'zero_inbox',
    title: 'Inbox Zero',
    description: 'Complete all pending todos',
    icon: '🎉',
    target: 1,
  },
];

export const KEYBOARD_SHORTCUTS = {
  NEW_TODO: 'n',
  SEARCH: 'k',
  TOGGLE_THEME: 't',
  SAVE: 'Ctrl+s',
  ESCAPE: 'Escape',
} as const;

export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 3000;
