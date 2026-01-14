import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus, TodoPriority, Subtask } from '@/types/todo.types';
import { userStorage } from '@/utils/storage';
import { generateId } from '@/utils/helpers';
import { logoutUser } from '../auth/authSlice';

interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  selectedTodos: string[];
  filters: {
    status: string;
    priority: string;
    category: string;
    search: string;
    dueDate: string;
  };
  sortBy: {
    field: string;
    order: 'asc' | 'desc';
  };
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
  selectedTodos: [],
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    dueDate: 'all',
  },
  sortBy: {
    field: 'createdAt',
    order: 'desc',
  },
};

// Async thunks
export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async (userId: string, { rejectWithValue }) => {
    try {
      const todos = userStorage.getTodos(userId);
      // Extra filter to ensure only this user's todos are returned
      const userTodos = todos.filter(todo => todo.userId === userId);
      return userTodos;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to load todos');
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async ({ userId, todo }: { userId: string; todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> }, { rejectWithValue }) => {
    try {
      const newTodo: Todo = {
        ...todo,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      userStorage.addTodo(userId, newTodo);
      return newTodo;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create todo');
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ userId, todoId, updates }: { userId: string; todoId: string; updates: Partial<Todo> }, { rejectWithValue }) => {
    try {
      userStorage.updateTodo(userId, todoId, updates);
      const todos = userStorage.getTodos(userId);
      const updated = todos.find(t => t.id === todoId);
      if (!updated) {
        throw new Error('Todo not found');
      }
      return updated;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update todo');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async ({ userId, todoId }: { userId: string; todoId: string }, { rejectWithValue }) => {
    try {
      userStorage.deleteTodo(userId, todoId);
      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete todo');
    }
  }
);

export const deleteTodos = createAsyncThunk(
  'todos/deleteTodos',
  async ({ userId, todoIds }: { userId: string; todoIds: string[] }, { rejectWithValue }) => {
    try {
      userStorage.deleteTodos(userId, todoIds);
      return todoIds;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete todos');
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TodosState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action: PayloadAction<TodosState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    toggleTodoSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedTodos.indexOf(action.payload);
      if (index === -1) {
        state.selectedTodos.push(action.payload);
      } else {
        state.selectedTodos.splice(index, 1);
      }
    },
    selectAllTodos: (state, action: PayloadAction<string[]>) => {
      state.selectedTodos = action.payload;
    },
    clearSelection: (state) => {
      state.selectedTodos = [];
    },
    addSubtask: (state, action: PayloadAction<{ todoId: string; subtask: Omit<Subtask, 'id' | 'createdAt' | 'updatedAt'> }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      if (todo) {
        if (!todo.subtasks) {
          todo.subtasks = [];
        }
        todo.subtasks.push({
          ...action.payload.subtask,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        todo.updatedAt = new Date().toISOString();
      }
    },
    updateSubtask: (state, action: PayloadAction<{ todoId: string; subtaskId: string; updates: Partial<Subtask> }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      if (todo && todo.subtasks) {
        const subtask = todo.subtasks.find(s => s.id === action.payload.subtaskId);
        if (subtask) {
          Object.assign(subtask, action.payload.updates, {
            updatedAt: new Date().toISOString(),
          });
          todo.updatedAt = new Date().toISOString();
        }
      }
    },
    deleteSubtask: (state, action: PayloadAction<{ todoId: string; subtaskId: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.todoId);
      if (todo && todo.subtasks) {
        todo.subtasks = todo.subtasks.filter(s => s.id !== action.payload.subtaskId);
        todo.updatedAt = new Date().toISOString();
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter(t => t.id !== action.payload);
        state.selectedTodos = state.selectedTodos.filter(id => id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = state.todos.filter(t => !action.payload.includes(t.id));
        state.selectedTodos = [];
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Clear todos on logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.todos = [];
        state.selectedTodos = [];
        state.error = null;
      });
  },
});

export const {
  setFilters,
  setSortBy,
  toggleTodoSelection,
  selectAllTodos,
  clearSelection,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  clearError,
} = todosSlice.actions;

export default todosSlice.reducer;