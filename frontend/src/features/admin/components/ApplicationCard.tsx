import { useState, memo } from 'react';
import {
  Card,
  CardContent,
  Badge,
  Button,
} from '@/components/ui';
import { RejectInlineForm } from './RejectInlineForm';
import { formatCurrency } from '@/lib/utils';
import { useApproveApplication, useRejectApplication, useToggleDiscountCode } from '@/hooks';
import type { PartnerApplication } from '@/types';

interface ApplicationCardProps {
  application: PartnerApplication;
}

const statusBadge: Record<string, { variant: 'warning' | 'success' | 'danger'; label: string }> = {
  PENDING: { variant: 'warning', label: 'Pending' },
  APPROVED: { variant: 'success', label: 'Approved' },
  REJECTED: { variant: 'danger', label: 'Rejected' },
};

export const ApplicationCard = memo(function ApplicationCard({ application }: ApplicationCardProps) {
  const [showReject, setShowReject] = useState(false);
  const approveMutation = useApproveApplication();
  const rejectMutation = useRejectApplication();
  const toggleMutation = useToggleDiscountCode();

  const handleApprove = () => {
    approveMutation.mutate(application.id);
  };

  const handleReject = (reason: string) => {
    rejectMutation.mutate(
      { id: application.id, reason },
      { onSuccess: () => setShowReject(false) },
    );
  };

  const handleToggle = (codeId: string) => {
    toggleMutation.mutate(codeId);
  };

  const badge = statusBadge[application.status] || statusBadge.PENDING;

  return (
    <Card padding="md">
      <CardContent className="p-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold text-gray-900" title={application.businessName}>
                {application.businessName}
              </h3>
              <Badge variant={badge.variant} size="sm">
                {badge.label}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 truncate">{application.email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          <div className="min-w-0">
            <span className="text-gray-500">Applicant</span>
            <p className="truncate font-medium text-gray-900" title={application.name}>{application.name}</p>
          </div>
          <div className="min-w-0">
            <span className="text-gray-500">Partner Type</span>
            <p className="truncate font-medium text-gray-900">{application.partnerType}</p>
          </div>
          <div className="min-w-0">
            <span className="text-gray-500">Audience</span>
            <p className="font-medium text-gray-900">
              {application.audienceSize.toLocaleString()}
            </p>
          </div>
          {application.socialLink && (
            <div className="col-span-full min-w-0">
              <span className="text-gray-500">Social Link</span>
              <p className="truncate font-medium text-gray-900" title={application.socialLink}>
                {application.socialLink}
              </p>
            </div>
          )}
          {application.description && (
            <div className="col-span-full min-w-0">
              <span className="text-gray-500">Description</span>
              <p className="text-gray-700 line-clamp-3">{application.description}</p>
            </div>
          )}
          {application.rejectionReason && (
            <div className="col-span-full min-w-0">
              <span className="text-red-500">Rejection Reason</span>
              <p className="text-gray-700">{application.rejectionReason}</p>
            </div>
          )}
        </div>

        {application.status === 'PENDING' && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleApprove}
              isLoading={approveMutation.isPending}
              disabled={approveMutation.isPending}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowReject(true)}
              disabled={rejectMutation.isPending}
            >
              Reject
            </Button>
          </div>
        )}

        {showReject && (
          <RejectInlineForm
            onSubmit={handleReject}
            onCancel={() => setShowReject(false)}
            isLoading={rejectMutation.isPending}
          />
        )}

        {application.status === 'APPROVED' && application.discountCode && (
          <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Discount Code
            </p>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-gray-900">{application.discountCode.code}</span>
                <Badge variant={application.discountCode.active ? 'success' : 'default'} size="sm">
                  {application.discountCode.active ? 'Active' : 'Inactive'}
                </Badge>
                <span className="text-xs text-gray-500">
                  {application.discountCode.type === 'PERCENTAGE' ? `${application.discountCode.value}%` : formatCurrency(application.discountCode.value)} | {application.discountCode.usageCount} use{application.discountCode.usageCount !== 1 ? 's' : ''}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggle(application.discountCode!.id)}
                isLoading={toggleMutation.isPending}
              >
                {application.discountCode.active ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
