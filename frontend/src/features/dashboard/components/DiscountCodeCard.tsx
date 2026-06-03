import { memo } from 'react';
import { Card, Badge } from '@/components/ui';
import { CopyCodeButton } from './CopyCodeButton';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { DiscountCode } from '@/types';

interface DiscountCodeCardProps {
  code: DiscountCode;
}

export const DiscountCodeCard = memo(function DiscountCodeCard({ code }: DiscountCodeCardProps) {
  return (
    <Card padding="md" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-2.5">
          <span className="truncate font-mono text-sm font-semibold tracking-wide text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg ring-1 ring-inset ring-gray-200" title={code.code}>
            {code.code}
          </span>
          <Badge variant={code.active ? 'success' : 'default'} size="sm">
            {code.active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
          <span>
            Value: <span className="font-medium text-gray-700">{code.type === 'PERCENTAGE' ? `${code.value}%` : formatCurrency(code.value)}</span>
          </span>
          <span>
            Used: <span className="font-medium text-gray-700">{code.usageCount} time{code.usageCount !== 1 ? 's' : ''}</span>
          </span>
          {code.expiresAt && (
            <span>
              Expires: <span className="font-medium text-gray-700">{formatDate(code.expiresAt)}</span>
            </span>
          )}
        </div>
      </div>
      <CopyCodeButton code={code.code} />
    </Card>
  );
});
