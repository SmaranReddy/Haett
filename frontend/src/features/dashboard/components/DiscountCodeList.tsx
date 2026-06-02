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
      <h2 className="mb-5 text-lg font-semibold tracking-tight text-gray-900">Discount Codes</h2>
      <div className="space-y-4">
        {codes.map((code) => (
          <DiscountCodeCard key={code.id} code={code} />
        ))}
      </div>
    </div>
  );
}
