import { Tag } from 'lucide-react';

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-surface-secondary/50 p-14 text-center" role="status">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ring-1 ring-inset ring-gray-300/50">
        <Tag className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">No discount codes yet</h3>
      <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
        Discount codes are generated when the admin reviews and approves your application. Check back after approval.
      </p>
    </div>
  );
}
