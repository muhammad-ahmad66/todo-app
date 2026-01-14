import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Profile as ProfileComponent } from '@/features/auth/Profile';

export const Profile: React.FC = () => {
  return (
    <PageContainer>
      <Breadcrumb />
      <ProfileComponent />
    </PageContainer>
  );
};