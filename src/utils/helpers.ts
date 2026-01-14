import { Todo } from '../types/todo.types';
import { format, isPast, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if todo is overdue
 */
export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  try {
    return isPast(parseISO(dueDate)) && !isToday(parseISO(dueDate));
  } catch {
    return false;
  }
};

/**
 * Filter todos by various criteria
 */
export const filterTodos = (
  todos: Todo[],
  filters: {
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
    dueDate?: string;
  }
): Todo[] => {
  return todos.filter(todo => {
    if (filters.status && filters.status !== 'all' && todo.status !== filters.status) {
      return false;
    }
    
    if (filters.priority && filters.priority !== 'all' && todo.priority !== filters.priority) {
      return false;
    }
    
    if (filters.category && filters.category !== 'all' && todo.category !== filters.category) {
      return false;
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = todo.title.toLowerCase().includes(searchLower);
      const matchesDescription = todo.description?.toLowerCase().includes(searchLower) || false;
      const matchesTags = todo.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
      
      if (!matchesTitle && !matchesDescription && !matchesTags) {
        return false;
      }
    }
    
    if (filters.dueDate && filters.dueDate !== 'all') {
      if (!todo.dueDate) return false;
      
      const due = parseISO(todo.dueDate);
      switch (filters.dueDate) {
        case 'today':
          if (!isToday(due)) return false;
          break;
        case 'week':
          if (!isThisWeek(due)) return false;
          break;
        case 'month':
          if (!isThisMonth(due)) return false;
          break;
        case 'overdue':
          if (!isOverdue(todo.dueDate)) return false;
          break;
      }
    }
    
    return true;
  });
};

/**
 * Sort todos
 */
export const sortTodos = (
  todos: Todo[],
  sortBy: { field: string; order: 'asc' | 'desc' }
): Todo[] => {
  const sorted = [...todos].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy.field) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      case 'dueDate':
        aValue = a.dueDate ? parseISO(a.dueDate).getTime() : Infinity;
        bValue = b.dueDate ? parseISO(b.dueDate).getTime() : Infinity;
        break;
      case 'createdAt':
        aValue = parseISO(a.createdAt).getTime();
        bValue = parseISO(b.createdAt).getTime();
        break;
      case 'status':
        const statusOrder = { completed: 1, 'in-progress': 2, pending: 3, archived: 4 };
        aValue = statusOrder[a.status] || 5;
        bValue = statusOrder[b.status] || 5;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortBy.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortBy.order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

/**
 * Calculate productivity streak
 */
export const calculateStreak = (todos: Todo[]): { current: number; longest: number } => {
  const completedTodos = todos
    .filter(t => t.status === 'completed' && t.completedAt)
    .map(t => ({
      date: format(parseISO(t.completedAt!), 'yyyy-MM-dd'),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
  
  const uniqueDates = [...new Set(completedTodos.map(t => t.date))];
  
  if (uniqueDates.length === 0) return { current: 0, longest: 0 };
  
  // Calculate current streak
  let current = 0;
  const today = format(new Date(), 'yyyy-MM-dd');
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
  
  if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
    current = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        current++;
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak
  let longest = 1;
  let maxLongest = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      longest++;
      maxLongest = Math.max(maxLongest, longest);
    } else {
      longest = 1;
    }
  }
  
  return { current, longest: maxLongest };
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Download file
 */
export const downloadFile = (content: string, filename: string, mimeType = 'application/json'): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};