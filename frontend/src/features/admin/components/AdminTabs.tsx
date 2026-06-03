import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
  count: number;
}

interface AdminTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function AdminTabs({ tabs, activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="mb-8 inline-flex gap-1 rounded-xl bg-surface-tertiary p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          role="tab"
          aria-selected={activeTab === tab.key}
          className={cn(
            'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
            activeTab === tab.key
              ? 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200'
              : 'text-gray-500 hover:text-gray-700',
          )}
        >
          {tab.label}
          <span
            className={cn(
              'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium tabular-nums',
              activeTab === tab.key
                ? 'bg-brand-100 text-brand-700'
                : 'bg-gray-200 text-gray-600',
            )}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
