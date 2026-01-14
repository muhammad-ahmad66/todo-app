import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';

export const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], // Only persist auth and theme
  blacklist: ['todos'], // Don't persist todos - use localStorage utilities instead
};