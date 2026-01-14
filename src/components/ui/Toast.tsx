import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: 'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700',
        style: {
          background: '#fff',
          color: '#1f2937',
          borderRadius: '0.75rem',
          padding: '1rem 1.25rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          maxWidth: '420px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
          className: 'dark:bg-green-900/20 dark:text-green-200 dark:border-green-800',
          style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #86efac',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          className: 'dark:bg-red-900/20 dark:text-red-200 dark:border-red-800',
          style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fca5a5',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
          },
        },
      }}
    />
  );
};

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
    });
  },
  info: (message: string) => {
    toast(message, {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      className: 'dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800',
      style: {
        background: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #93c5fd',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
      },
    });
  },
  warning: (message: string) => {
    toast(message, {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      className: 'dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-800',
      style: {
        background: '#fffbeb',
        color: '#92400e',
        border: '1px solid #fcd34d',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
      },
    });
  },
  loading: (message: string) => toast.loading(message),
};