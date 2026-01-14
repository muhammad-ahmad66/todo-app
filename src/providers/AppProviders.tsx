import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, RootState } from '@/store';
import { ToastContainer } from '@/components/ui/Toast';
import { Loader } from '@/components/Loader';

const ThemeInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode, dispatch]);

  return <>{children}</>;
};

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader fullScreen />} persistor={persistor}>
        <ThemeInitializer>
          {children}
          <ToastContainer />
        </ThemeInitializer>
      </PersistGate>
    </Provider>
  );
};