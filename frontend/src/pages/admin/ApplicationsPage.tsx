import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAllApplications } from '@/hooks';
import {
  AdminTabs,
  AdminApplicationList,
  AdminSkeleton,
} from '@/features/admin/components';
import { ErrorFallback } from '@/components/feedback';
import { getApiError } from '@/lib/utils';

export default function AdminApplicationsPage() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto max-w-4xl"
    >
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">Applications</h1>
      <p className="mb-6 text-sm text-gray-500">Review and manage partner applications</p>

      <AdminTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {isLoading ? (
        <AdminSkeleton />
      ) : isError ? (
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      ) : (
        <AdminApplicationList applications={filteredApplications} activeTab={activeTab} />
      )}
    </motion.div>
  );
}
