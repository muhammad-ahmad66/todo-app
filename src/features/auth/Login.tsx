import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from './authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateLogin, LoginErrors } from '@/utils/validators';
import { showToast } from '@/components/ui/Toast';
import { ROUTES } from '@/utils/constants';
import { LogIn } from 'lucide-react';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateLogin(formData.username, formData.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      showToast.success('Login successful!');
      const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    } else {
      showToast.error(result.payload as string || 'Login failed');
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome back</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to your account</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
          autoFocus
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
          leftIcon={<LogIn className="w-5 h-5" />}
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to={ROUTES.SIGNUP} className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
};