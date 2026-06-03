import { Tag } from 'lucide-react';
import { DiscountCodeCard } from './DiscountCodeCard';
import { DashboardEmptyState } from './DashboardEmptyState';
import type { DiscountCode } from '@/types';

interface DiscountCodeListProps {
  codes: DiscountCode[];
}

export function DiscountCodeList({ codes }: DiscountCodeListProps) {
  if (codes.length === 0) {
    return <DashboardEmptyState />;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Tag className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">Discount Codes</h2>
      </div>
      <div className="space-y-4">
        {codes.map((code) => (
          <DiscountCodeCard key={code.id} code={code} />
        ))}
      </div>
    </div>
  );
}
