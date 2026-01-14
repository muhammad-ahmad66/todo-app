import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { PageContainer } from '@/components/layout/PageContainer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TODO_PRIORITIES, CATEGORIES } from '@/utils/constants';
import { PortfolioCTA } from '@/components/PortfolioCTA';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const Analytics: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todos);

  const priorityData = useMemo(() => {
    return TODO_PRIORITIES.map(p => ({
      name: p.label,
      value: todos.filter(t => t.priority === p.value).length,
    }));
  }, [todos]);

  const categoryData = useMemo(() => {
    return CATEGORIES.slice(0, 6).map(c => ({
      name: c.name,
      value: todos.filter(t => t.category === c.name).length,
    }));
  }, [todos]);

  const statusData = useMemo(() => {
    return [
      { name: 'Pending', value: todos.filter(t => t.status === 'pending').length },
      { name: 'In Progress', value: todos.filter(t => t.status === 'in-progress').length },
      { name: 'Completed', value: todos.filter(t => t.status === 'completed').length },
      { name: 'Archived', value: todos.filter(t => t.status === 'archived').length },
    ];
  }, [todos]);

  return (
    <PageContainer>
      <Breadcrumb />
      <Typography variant="h1" className="mb-6">Analytics</Typography>

      <div className="grid md:grid-cols-2 gap-6">
        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Priority Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg">
          <Typography variant="h3" className="mb-4">Status Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg" className="md:col-span-2">
          <Typography variant="h3" className="mb-4">Category Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <PortfolioCTA />
    </PageContainer>
  );
};