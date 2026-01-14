import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Card } from '@/components/ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TODO_PRIORITIES } from '@/utils/constants';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const AnalyticsCharts: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todos);

  const priorityData = useMemo(() => {
    return TODO_PRIORITIES.map(p => ({
      name: p.label,
      value: todos.filter(t => t.priority === p.value).length,
    }));
  }, [todos]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card padding="lg">
        <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
    </div>
  );
};