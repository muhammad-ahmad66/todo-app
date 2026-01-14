import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { showToast } from '@/components/ui/Toast';

export const Settings: React.FC = () => {
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
      localStorage.clear();
      showToast.success('All data cleared!');
      window.location.reload();
    }
  };

  return (
    <PageContainer>
      <Breadcrumb />
      <Typography variant="h1" className="mb-6">Settings</Typography>

      <div className="space-y-6 max-w-2xl">
        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Appearance</Typography>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Theme</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Data Management</Typography>
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-medium text-red-600 dark:text-red-400">Clear All Data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete all your data</p>
            </div>
            <Button variant="danger" onClick={handleClearData} leftIcon={<Trash2 className="w-4 h-4" />}>
              Clear
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};