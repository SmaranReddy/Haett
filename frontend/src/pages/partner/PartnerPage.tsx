import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { LogoutButton } from '@/components/common';
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
  if (isReapplying && application?.status === 'REJECTED') {
    return { type: 'apply' };
  }

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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      </div>
    );
  }
  if (!dashboard) return null;

  return (
    <div className="min-h-screen bg-surface-secondary px-6 py-12">
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
      <div className="min-h-screen bg-surface-secondary px-6 py-12">
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Admin Review Panel</h1>
        <AdminTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminApplicationList applications={filteredApplications} activeTab={activeTab} />
      </div>
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

function renderView(
  view: PartnerView,
  isReapplying: boolean,
  setReapplying: (v: boolean) => void,
  reapplyApplication?: PartnerApplication | null,
): ReactNode {
  const content = (() => {
    switch (view.type) {
      case 'loading-hydrate':
      case 'loading-application':
        return <ApplicationSkeleton />;
      case 'error':
        return (
          <div className="flex min-h-screen items-center justify-center bg-surface-secondary px-6 py-16">
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
            existingApplication={reapplyApplication ?? undefined}
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
  })();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view.type}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
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

  const showLogout = isAuthenticated && !['loading-hydrate', 'loading-application', 'error'].includes(view.type);

  return (
    <>
      {showLogout && <LogoutButton />}
      {renderView(view, isReapplying, setIsReapplying, isReapplying ? application : null)}
    </>
  );
}
