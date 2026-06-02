import { Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';

interface DashboardHeaderProps {
  partnerType: string;
  approvedAt: string;
}

export function DashboardHeader({ partnerType, approvedAt }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Partner Dashboard</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Badge variant="primary" size="md">
          {partnerType}
        </Badge>
        <span className="text-sm text-gray-500">
          Approved {formatDate(approvedAt)}
        </span>
      </div>
    </div>
  );
}
