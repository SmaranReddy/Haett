import { Card, CardContent } from '@/components/ui';
import { memo, type ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export const StatCard = memo(function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card padding="md" className="flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-inset ring-brand-200/50 shadow-sm">
        {icon}
      </span>
      <CardContent className="p-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
});
