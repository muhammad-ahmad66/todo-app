import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { TodoList } from '@/features/todos/TodoList';
import { TodoFilters } from '@/features/todos/TodoFilters';
import { AddTodoForm } from '@/features/todos/AddTodoForm';
import { Todo } from '@/types/todo.types';
import { Plus } from 'lucide-react';
import { PortfolioCTA } from '@/components/PortfolioCTA';

export const Todos: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  return (
    <PageContainer>
      <Breadcrumb />
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h1">Todos</Typography>
        <Button
          variant="primary"
          onClick={() => {
            setEditingTodo(null);
            setIsFormOpen(true);
          }}
          leftIcon={<Plus className="w-5 h-5" />}
        >
          New Todo
        </Button>
      </div>

      <TodoFilters />

      <div className="mt-6">
        <TodoList onEditTodo={handleEditTodo} onAddTodo={() => setIsFormOpen(true)} />
      </div>

      <PortfolioCTA />

      <AddTodoForm isOpen={isFormOpen} onClose={handleCloseForm} todo={editingTodo} />
    </PageContainer>
  );
};