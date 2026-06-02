export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-surface-secondary/50 p-14 text-center" role="status">
      <svg className="mb-5 h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
      </svg>
      <h3 className="text-base font-semibold text-gray-900">No discount codes yet</h3>
      <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
        Discount codes are generated when the admin reviews and approves your application. Check back after approval.
      </p>
    </div>
  );
}
