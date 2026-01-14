import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppRouter } from '@/routes/AppRouter';
import { AppProviders } from '@/providers/AppProviders';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;