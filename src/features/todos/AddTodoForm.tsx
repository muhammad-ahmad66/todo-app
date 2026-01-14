import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { createTodo, updateTodo } from './todosSlice';
import { Todo } from '@/types/todo.types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Modal } from '@/components/ui/Modal';
import { validateTodo } from '@/utils/validators';
import { showToast } from '@/components/ui/Toast';
import { TODO_PRIORITIES, TODO_STATUSES, CATEGORIES } from '@/utils/constants';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo | null;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ isOpen, onClose, todo }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const { isLoading } = useAppSelector((state) => state.todos);

  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    status: todo?.status || 'pending',
    priority: todo?.priority || 'medium',
    category: todo?.category || CATEGORIES[0].name,
    dueDate: todo?.dueDate || '',
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  React.useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        status: todo.status,
        priority: todo.priority,
        category: todo.category,
        dueDate: todo.dueDate || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        category: CATEGORIES[0].name,
        dueDate: '',
      });
    }
    setErrors({});
  }, [todo, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) return;

    const validationErrors = validateTodo(formData.title, formData.description);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const categoryColor = CATEGORIES.find(c => c.name === formData.category)?.color;

    if (todo) {
      const result = await dispatch(updateTodo({
        userId,
        todoId: todo.id,
        updates: {
          ...formData,
          categoryColor,
        },
      }));
      
      if (updateTodo.fulfilled.match(result)) {
        showToast.success('Todo updated successfully!');
        onClose();
      }
    } else {
      const result = await dispatch(createTodo({
        userId,
        todo: {
          userId,
          title: formData.title,
          description: formData.description,
          status: formData.status as Todo['status'],
          priority: formData.priority as Todo['priority'],
          category: formData.category,
          categoryColor,
          dueDate: formData.dueDate || undefined,
          tags: [],
          subtasks: [],
        },
      }));
      
      if (createTodo.fulfilled.match(result)) {
        showToast.success('Todo created successfully!');
        onClose();
      }
    }
  };

  const statusOptions = TODO_STATUSES.map(s => ({
    label: s.label,
    value: s.value,
  }));

  const priorityOptions = TODO_PRIORITIES.map(p => ({
    label: `${p.icon} ${p.label}`,
    value: p.value,
    icon: <span>{p.icon}</span>,
  }));

  const categoryOptions = CATEGORIES.map(c => ({
    label: c.name,
    value: c.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={todo ? 'Edit Todo' : 'Create New Todo'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
          autoFocus
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            placeholder="Add a description..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <Dropdown
              options={statusOptions}
              value={formData.status}
              onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <Dropdown
              options={priorityOptions}
              value={formData.priority}
              onChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <Dropdown
              options={categoryOptions}
              value={formData.category}
              onChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            />
          </div>

          <div>
            <Input
              label="Due Date"
              name="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading} leftIcon={<Plus className="w-4 h-4" />}>
            {todo ? 'Update Todo' : 'Create Todo'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};