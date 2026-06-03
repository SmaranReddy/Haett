import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-surface-secondary/50 p-12 text-center',
        className,
      )}
      role="status"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ring-1 ring-inset ring-gray-300/50">
        <Inbox className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-gray-500 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
