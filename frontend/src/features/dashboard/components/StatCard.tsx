import { Card, CardContent } from '@/components/ui';
import { memo, type ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export const StatCard = memo(function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card padding="md" className="flex items-center gap-4 card-lift">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-200/50">
        {icon}
      </span>
      <CardContent className="p-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
});
