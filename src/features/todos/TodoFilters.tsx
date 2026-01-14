import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, setSortBy } from './todosSlice';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { TODO_STATUSES, TODO_PRIORITIES, CATEGORIES } from '@/utils/constants';
import { Search, Filter, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

export const TodoFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, sortBy } = useAppSelector((state) => state.todos);
  const [searchTerm, setSearchTerm] = React.useState(filters.search);
  const debouncedSearch = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    ...TODO_STATUSES.map(s => ({ label: s.label, value: s.value })),
  ];

  const priorityOptions = [
    { label: 'All Priorities', value: 'all' },
    ...TODO_PRIORITIES.map(p => ({ label: `${p.icon} ${p.label}`, value: p.value })),
  ];

  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    ...CATEGORIES.map(c => ({ label: c.name, value: c.name })),
  ];

  const dueDateOptions = [
    { label: 'All Dates', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Overdue', value: 'overdue' },
  ];

  const sortOptions = [
    { label: 'Date Created (Newest)', value: 'createdAt-desc' },
    { label: 'Date Created (Oldest)', value: 'createdAt-asc' },
    { label: 'Due Date (Earliest)', value: 'dueDate-asc' },
    { label: 'Due Date (Latest)', value: 'dueDate-desc' },
    { label: 'Priority (High to Low)', value: 'priority-desc' },
    { label: 'Priority (Low to High)', value: 'priority-asc' },
    { label: 'Title (A-Z)', value: 'title-asc' },
    { label: 'Title (Z-A)', value: 'title-desc' },
  ];

  const handleSortChange = (value: string) => {
    const [field, order] = value.split('-');
    dispatch(setSortBy({ field, order: order as 'asc' | 'desc' }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    dispatch(setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      search: '',
      dueDate: 'all',
    }));
  };

  const hasActiveFilters = filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.search !== '' ||
    filters.dueDate !== 'all';

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Filters & Sort</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            leftIcon={<X className="w-4 h-4" />}
            className="ml-auto"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />

        <Dropdown
          options={statusOptions}
          value={filters.status}
          onChange={(value) => dispatch(setFilters({ status: value }))}
          placeholder="Filter by status"
        />

        <Dropdown
          options={priorityOptions}
          value={filters.priority}
          onChange={(value) => dispatch(setFilters({ priority: value }))}
          placeholder="Filter by priority"
        />

        <Dropdown
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => dispatch(setFilters({ category: value }))}
          placeholder="Filter by category"
        />

        <Dropdown
          options={dueDateOptions}
          value={filters.dueDate}
          onChange={(value) => dispatch(setFilters({ dueDate: value }))}
          placeholder="Filter by due date"
        />

        <Dropdown
          options={sortOptions}
          value={`${sortBy.field}-${sortBy.order}`}
          onChange={handleSortChange}
          placeholder="Sort by"
        />
      </div>
    </div>
  );
};