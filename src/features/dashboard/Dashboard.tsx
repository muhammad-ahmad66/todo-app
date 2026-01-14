import React from 'react';
import { UserInsights } from './UserInsights';
import { QuickActions } from './QuickActions';
import { AnalyticsCharts } from './AnalyticsCharts';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <UserInsights />
      <QuickActions />
      <AnalyticsCharts />
    </div>
  );
};