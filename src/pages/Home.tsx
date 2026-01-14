import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { ROUTES } from '@/utils/constants';
import { CheckCircle2, Zap, TrendingUp, Shield } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Logo size="lg" showText className="justify-center mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Premium Task Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Organize your life with our powerful, beautiful, and intuitive todo application.
            Built for productivity and designed for elegance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={ROUTES.SIGNUP}>
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {[
            { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Blazing fast performance' },
            { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Smart Features', desc: 'AI-powered insights' },
            { icon: <TrendingUp className="w-8 h-8" />, title: 'Analytics', desc: 'Track your progress' },
            { icon: <Shield className="w-8 h-8" />, title: 'Secure', desc: 'Your data is safe' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};