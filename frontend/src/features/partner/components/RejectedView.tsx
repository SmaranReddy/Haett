import { Badge, Button, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { StatusCard } from './StatusCard';
import { InfoRow } from './InfoRow';
import { formatDate } from '@/lib/utils';
import type { PartnerApplication } from '@/types';

interface RejectedViewProps {
  application: PartnerApplication;
  onReapply: () => void;
}

export function RejectedView({ application, onReapply }: RejectedViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-secondary px-6 py-16">
      <StatusCard>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-inset ring-red-200">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <CardHeader className="mb-0">
            <CardTitle>Application Not Approved</CardTitle>
            <CardDescription>
              Unfortunately, we were unable to approve your application at this time
            </CardDescription>
          </CardHeader>
        </div>

        <Badge variant="danger" size="md" className="mx-auto mb-6 block w-fit">
          Not Approved
        </Badge>

        <div className="divide-y divide-gray-100 border-t border-gray-100">
          <InfoRow label="Business Name" value={application.businessName} />
          <InfoRow label="Partner Type" value={application.partnerType} />
          <InfoRow label="Submitted" value={formatDate(application.appliedAt)} />
        </div>

        {application.rejectionReason && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50/50 p-5">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-red-700">
              Reason
            </p>
            <p className="text-sm leading-relaxed text-red-800">
              {application.rejectionReason}
            </p>
          </div>
        )}

        <div className="mt-6 rounded-xl bg-surface-tertiary p-6">
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            Don&apos;t be discouraged. You can update your information and resubmit your
            application for another review. Make sure your business details are accurate
            and complete before reapplying.
          </p>
          <Button size="lg" className="w-full" onClick={onReapply}>
            Reapply Now
          </Button>
        </div>
      </StatusCard>
    </div>
  );
}
