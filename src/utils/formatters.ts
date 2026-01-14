import { format, formatDistance, formatRelative, parseISO, isPast, isToday, isTomorrow } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date, formatStr: string = 'PP'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch {
    return '';
  }
};

/**
 * Format relative date (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch {
    return '';
  }
};

/**
 * Format date with smart formatting (today, tomorrow, etc.)
 */
export const formatSmartDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (isToday(dateObj)) {
      return 'Today';
    }
    
    if (isTomorrow(dateObj)) {
      return 'Tomorrow';
    }
    
    if (isPast(dateObj)) {
      return formatRelative(dateObj, new Date());
    }
    
    return formatDate(date, 'MMM d, yyyy');
  } catch {
    return '';
  }
};

/**
 * Format time
 */
export const formatTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'h:mm a');
  } catch {
    return '';
  }
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'PPp');
  } catch {
    return '';
  }
};

/**
 * Format priority text
 */
export const formatPriority = (priority: string): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

/**
 * Format status text
 */
export const formatStatus = (status: string): string => {
  if (status === 'in-progress') {
    return 'In Progress';
  }
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Format category name
 */
export const formatCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};