import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todosReducer from '../features/todos/todosSlice';
import themeReducer from '../features/theme/themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;