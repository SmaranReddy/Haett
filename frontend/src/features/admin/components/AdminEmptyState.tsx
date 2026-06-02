interface AdminEmptyStateProps {
  activeTab: string;
}

export function AdminEmptyState({ activeTab }: AdminEmptyStateProps) {
  const tabLabel = activeTab === 'all' ? '' : activeTab;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-surface-secondary/50 p-14 text-center">
      <svg className="mb-5 h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
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
