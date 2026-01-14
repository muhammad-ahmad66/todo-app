import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signupUser, clearError } from './authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateSignup, SignupErrors } from '@/utils/validators';
import { showToast } from '@/components/ui/Toast';
import { ROUTES } from '@/utils/constants';
import { UserPlus } from 'lucide-react';

export const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<SignupErrors>({});

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignupErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSignup(
      formData.username,
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(result)) {
      showToast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } else {
      showToast.error(result.payload as string || 'Signup failed');
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create account</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Sign up to get started</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />

          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          helperText="Must be at least 6 characters"
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
          leftIcon={<UserPlus className="w-5 h-5" />}
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};