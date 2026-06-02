import { Badge, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { StatusCard } from './StatusCard';
import { InfoRow } from './InfoRow';
import { formatDate } from '@/lib/utils';
import type { PartnerApplication } from '@/types';

interface PendingViewProps {
  application: PartnerApplication;
}

export function PendingView({ application }: PendingViewProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <StatusCard>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <CardHeader className="mb-0">
            <CardTitle>Application Under Review</CardTitle>
            <CardDescription>
              We are reviewing your application and will get back to you soon
            </CardDescription>
          </CardHeader>
        </div>

        <Badge variant="warning" size="md" className="mx-auto mb-6 block w-fit">
          Pending Review
        </Badge>

        <div className="divide-y divide-gray-100 border-t border-gray-100">
          <InfoRow label="Business Name" value={application.businessName} />
          <InfoRow label="Partner Type" value={application.partnerType} />
          <InfoRow label="Applied" value={formatDate(application.appliedAt)} />
        </div>

        <div className="mt-6 rounded-lg bg-brand-50 p-4">
          <p className="text-sm leading-relaxed text-brand-800">
            Thank you for your interest in our partner program. Our team is carefully
            reviewing your application and we will notify you via email once a decision
            has been made. This typically takes 1-2 business days.
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Applied on {formatDate(application.appliedAt)}
          </p>
        </div>
      </StatusCard>
    </div>
  );
}
