import { STORAGE_KEYS } from './constants';
import { Todo } from '../types/todo.types';
import { User } from '../types/auth.types';

/**
 * Generic localStorage helper functions
 */

export const storage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

/**
 * User-specific storage operations
 */
export const userStorage = {
  getTodos: (userId: string): Todo[] => {
    const allTodos = storage.get<Record<string, Todo[]>>(STORAGE_KEYS.TODOS, {});
    return allTodos[userId] || [];
  },

  setTodos: (userId: string, todos: Todo[]): void => {
    const allTodos = storage.get<Record<string, Todo[]>>(STORAGE_KEYS.TODOS, {});
    allTodos[userId] = todos;
    storage.set(STORAGE_KEYS.TODOS, allTodos);
  },

  addTodo: (userId: string, todo: Todo): void => {
    const todos = userStorage.getTodos(userId);
    todos.push(todo);
    userStorage.setTodos(userId, todos);
  },

  updateTodo: (userId: string, todoId: string, updates: Partial<Todo>): void => {
    const todos = userStorage.getTodos(userId);
    const index = todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates, updatedAt: new Date().toISOString() };
      userStorage.setTodos(userId, todos);
    }
  },

  deleteTodo: (userId: string, todoId: string): void => {
    const todos = userStorage.getTodos(userId);
    const filtered = todos.filter(t => t.id !== todoId);
    userStorage.setTodos(userId, filtered);
  },

  deleteTodos: (userId: string, todoIds: string[]): void => {
    const todos = userStorage.getTodos(userId);
    const filtered = todos.filter(t => !todoIds.includes(t.id));
    userStorage.setTodos(userId, filtered);
  },
};

/**
 * Users storage operations
 */
export const usersStorage = {
  getAll: (): Record<string, User> => {
    return storage.get<Record<string, User>>(STORAGE_KEYS.USERS, {});
  },

  get: (userId: string): User | null => {
    const users = usersStorage.getAll();
    return users[userId] || null;
  },

  set: (user: User): void => {
    const users = usersStorage.getAll();
    users[user.id] = user;
    storage.set(STORAGE_KEYS.USERS, users);
  },

  delete: (userId: string): void => {
    const users = usersStorage.getAll();
    delete users[userId];
    storage.set(STORAGE_KEYS.USERS, users);
  },
};

/**
 * Backup and restore operations
 */
export const backupStorage = {
  create: (): { todos: Record<string, Todo[]>, users: Record<string, User>, timestamp: string } => {
    return {
      todos: storage.get<Record<string, Todo[]>>(STORAGE_KEYS.TODOS, {}),
      users: usersStorage.getAll(),
      timestamp: new Date().toISOString(),
    };
  },

  save: (): void => {
    const backup = backupStorage.create();
    storage.set(STORAGE_KEYS.BACKUP, backup);
  },

  restore: (): boolean => {
    const backup = storage.get<{ todos: Record<string, Todo[]>, users: Record<string, User>, timestamp: string }>(STORAGE_KEYS.BACKUP, null);
    if (!backup) return false;
    
    storage.set(STORAGE_KEYS.TODOS, backup.todos);
    storage.set(STORAGE_KEYS.USERS, backup.users);
    return true;
  },

  export: (): string => {
    const backup = backupStorage.create();
    return JSON.stringify(backup, null, 2);
  },

  import: (json: string): boolean => {
    try {
      const data = JSON.parse(json);
      if (data.todos && data.users) {
        storage.set(STORAGE_KEYS.TODOS, data.todos);
        storage.set(STORAGE_KEYS.USERS, data.users);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing backup:', error);
      return false;
    }
  },
};