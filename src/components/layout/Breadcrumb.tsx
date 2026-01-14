import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: ROUTES.DASHBOARD }];

    paths.forEach((path, index) => {
      const fullPath = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({ label, path: fullPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path || index}>
          {index === 0 ? (
            <Link
              to={item.path || '#'}
              className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <ChevronRight className="w-4 h-4" />
              {item.path && index < breadcrumbs.length - 1 ? (
                <Link
                  to={item.path}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.label}
                </span>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};