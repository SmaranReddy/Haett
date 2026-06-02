import { ApplicationCard } from './ApplicationCard';
import { AdminEmptyState } from './AdminEmptyState';
import type { PartnerApplication } from '@/types';

interface AdminApplicationListProps {
  applications: PartnerApplication[];
  activeTab: string;
}

export function AdminApplicationList({ applications, activeTab }: AdminApplicationListProps) {
  if (applications.length === 0) {
    return <AdminEmptyState activeTab={activeTab} />;
  }

  return (
    <div className="space-y-5">
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
