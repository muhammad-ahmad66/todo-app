import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import { LayoutDashboard, ListTodo, BarChart3, User, Settings, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import clsx from 'clsx';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: ROUTES.DASHBOARD },
  { label: 'Todos', icon: <ListTodo className="w-5 h-5" />, path: ROUTES.TODOS },
  { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, path: ROUTES.ANALYTICS },
  { label: 'Profile', icon: <User className="w-5 h-5" />, path: ROUTES.PROFILE },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: ROUTES.SETTINGS },
  { label: 'Contact', icon: <MessageCircle className="w-5 h-5" />, path: ROUTES.CONTACT },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useAppSelector((state) => state.auth);

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center gap-1 px-4 py-2 text-sm transition-colors',
                location.pathname === item.path
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              )}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '256px' }}
      className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        {user && !isCollapsed && (
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {item.icon}
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 m-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors self-end"
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </motion.aside>
  );
};