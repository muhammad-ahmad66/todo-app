import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '@/types/theme.types';
import { STORAGE_KEYS } from '@/utils/constants';
import { storage } from '@/utils/storage';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  
  const saved = storage.get<ThemeMode>(STORAGE_KEYS.THEME);
  if (saved) return saved;
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
  systemPreference: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.systemPreference = action.payload;
      storage.set(STORAGE_KEYS.THEME, action.payload);
      
      // Apply theme to document
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(action.payload);
      }
    },
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      state.systemPreference = newMode;
      storage.set(STORAGE_KEYS.THEME, newMode);
      
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newMode);
      }
    },
    syncWithSystem: (state) => {
      if (typeof window !== 'undefined') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemMode: ThemeMode = prefersDark ? 'dark' : 'light';
        state.mode = systemMode;
        state.systemPreference = systemMode;
        storage.set(STORAGE_KEYS.THEME, systemMode);
        
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemMode);
      }
    },
  },
});

export const { setTheme, toggleTheme, syncWithSystem } = themeSlice.actions;
export default themeSlice.reducer;