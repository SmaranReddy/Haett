import { memo } from 'react';
import { Card, CardContent, Badge } from '@/components/ui';
import { CopyCodeButton } from './CopyCodeButton';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { DiscountCode } from '@/types';

interface DiscountCodeCardProps {
  code: DiscountCode;
}

export const DiscountCodeCard = memo(function DiscountCodeCard({ code }: DiscountCodeCardProps) {
  return (
    <Card padding="md" className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-mono text-sm font-semibold text-gray-900" title={code.code}>
            {code.code}
          </span>
          <Badge variant={code.active ? 'success' : 'default'} size="sm">
            {code.active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
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
