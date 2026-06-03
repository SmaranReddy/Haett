import { Tag, RefreshCw, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';
import { formatCurrency } from '@/lib/utils';
import type { DashboardStats } from '@/types';

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="mb-8 grid gap-5 sm:grid-cols-3">
      <StatCard
        label="Total Codes"
        value={String(stats.totalCodes)}
        icon={<Tag className="h-6 w-6" />}
      />
      <StatCard
        label="Total Uses"
        value={String(stats.totalCodeUses)}
        icon={<RefreshCw className="h-6 w-6" />}
      />
      <StatCard
        label="Total Discount Given"
        value={formatCurrency(stats.totalDiscountGiven)}
        icon={<DollarSign className="h-6 w-6" />}
      />
    </div>
  );
}
