import { useState, useCallback, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useMyApplication, useDashboard, useAllApplications } from '@/hooks';
import {
  LandingView,
  ApplicationFormView,
  PendingView,
  RejectedView,
  ApplicationSkeleton,
} from '@/features/partner/components';
import {
  DashboardHeader,
  StatsGrid,
  DiscountCodeList,
  DashboardSkeleton,
} from '@/features/dashboard/components';
import {
  AdminTabs,
  AdminApplicationList,
  AdminSkeleton,
} from '@/features/admin/components';
import { ErrorFallback } from '@/components/feedback';
import { getApiError } from '@/lib/utils';
import type { PartnerApplication } from '@/types';

type PartnerView =
  | { type: 'loading-hydrate' }
  | { type: 'loading-application' }
  | { type: 'error'; error: unknown; onRetry: () => void }
  | { type: 'visitor' }
  | { type: 'apply' }
  | { type: 'pending'; application: PartnerApplication }
  | { type: 'rejected'; application: PartnerApplication }
  | { type: 'approved' }
  | { type: 'admin' };

function computeView(
  isAuthenticated: boolean,
  isHydrated: boolean,
  role: string | null,
  application: PartnerApplication | null | undefined,
  isLoading: boolean,
  isError: boolean,
  error: unknown,
  refetch: () => void,
  isReapplying: boolean,
): PartnerView {
  if (!isHydrated) return { type: 'loading-hydrate' };
  if (role === 'ADMIN') return { type: 'admin' };
  if (!isAuthenticated) return { type: 'visitor' };
  if (isReapplying) return { type: 'apply' };

  if (isLoading) return { type: 'loading-application' };
  if (isError) {
    return { type: 'error', error, onRetry: () => refetch() };
  }

  if (!application) return { type: 'apply' };

  switch (application.status) {
    case 'PENDING':
      return { type: 'pending', application };
    case 'REJECTED':
      return { type: 'rejected', application };
    case 'APPROVED':
      return { type: 'approved' };
    default:
      return { type: 'apply' };
  }
}

function ApprovedDashboard() {
  const { data: dashboard, isLoading, isError, error, refetch } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      </div>
    );
  }
  if (!dashboard) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <DashboardHeader partnerType={dashboard.partnerType} approvedAt={dashboard.approvedAt} />
        <StatsGrid stats={dashboard.stats} />
        <DiscountCodeList codes={dashboard.codes} />
      </div>
    </div>
  );
}

function AdminReviewPanel() {
  const [activeTab, setActiveTab] = useState('pending');
  const { data: allApplications = [], isLoading, isError, error, refetch } = useAllApplications();

  const filteredApplications = activeTab === 'all'
    ? allApplications
    : allApplications.filter((app) => app.status.toLowerCase() === activeTab);

  const tabs = [
    { key: 'all', label: 'All', count: allApplications.length },
    { key: 'pending', label: 'Pending', count: allApplications.filter((a) => a.status === 'PENDING').length },
    { key: 'approved', label: 'Approved', count: allApplications.filter((a) => a.status === 'APPROVED').length },
    { key: 'rejected', label: 'Rejected', count: allApplications.filter((a) => a.status === 'REJECTED').length },
  ];

  if (isLoading) return <AdminSkeleton />;
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Review Panel</h1>
        <AdminTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminApplicationList applications={filteredApplications} activeTab={activeTab} />
      </div>
    </div>
  );
}

function renderView(view: PartnerView, isReapplying: boolean, setReapplying: (v: boolean) => void): ReactNode {
  switch (view.type) {
    case 'loading-hydrate':
    case 'loading-application':
      return <ApplicationSkeleton />;
    case 'error':
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
          <ErrorFallback
            message={getApiError(view.error)}
            onRetry={view.onRetry}
          />
        </div>
      );
    case 'visitor':
      return <LandingView />;
    case 'apply':
      return (
        <ApplicationFormView
          isReapply={isReapplying}
          onSuccess={() => setReapplying(false)}
        />
      );
    case 'pending':
      return <PendingView application={view.application} />;
    case 'rejected':
      return (
        <RejectedView
          application={view.application}
          onReapply={() => setReapplying(true)}
        />
      );
    case 'approved':
      return <ApprovedDashboard />;
    case 'admin':
      return <AdminReviewPanel />;
  }
}

export default function PartnerPage() {
  const { isAuthenticated, isHydrated, role } = useAuthStore();
  const { data: application, isLoading, isError, error, refetch } = useMyApplication();
  const [isReapplying, setIsReapplying] = useState(false);

  const view = computeView(
    isAuthenticated,
    isHydrated,
    role,
    application,
    isLoading,
    isError,
    error,
    refetch,
    isReapplying,
  );

  return <>{renderView(view, isReapplying, setIsReapplying)}</>;
}
