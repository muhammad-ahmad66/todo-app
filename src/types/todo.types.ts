export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TodoStatus = 'pending' | 'in-progress' | 'completed' | 'archived';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: string;
  categoryColor?: string;
  dueDate?: string;
  completedAt?: string;
  subtasks?: Subtask[];
  tags?: string[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  isRecurring?: boolean;
  recurringPattern?: string;
}

export interface TodoFilters {
  status?: TodoStatus | 'all';
  priority?: TodoPriority | 'all';
  category?: string | 'all';
  search?: string;
  dueDate?: 'today' | 'week' | 'month' | 'overdue' | 'all';
}

export interface TodoSortOption {
  field: 'title' | 'priority' | 'dueDate' | 'createdAt' | 'status';
  order: 'asc' | 'desc';
}

export interface TodoStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  archived: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
    urgent: number;
  };
  byCategory: Record<string, number>;
  completionRate: number;
  averageCompletionTime: number;
}