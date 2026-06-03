import { Inbox } from 'lucide-react';

interface AdminEmptyStateProps {
  activeTab: string;
}

export function AdminEmptyState({ activeTab }: AdminEmptyStateProps) {
  const tabLabel = activeTab === 'all' ? '' : activeTab;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-surface-secondary/50 p-14 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ring-1 ring-inset ring-gray-300/50">
        <Inbox className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">
        {activeTab === 'all' ? 'No applications found' : `No ${tabLabel} applications`}
      </h3>
      <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
        {activeTab === 'pending'
          ? 'All applications have been reviewed. Check back later for new submissions.'
          : activeTab === 'approved'
            ? 'No applications have been approved yet.'
            : activeTab === 'rejected'
              ? 'No applications have been rejected.'
              : 'Applications will appear here once they are submitted.'}
      </p>
    </div>
  );
}
