import { useAppSelector } from '@/store/hooks';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, token } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    token,
    userId: user?.id || null,
  };
};