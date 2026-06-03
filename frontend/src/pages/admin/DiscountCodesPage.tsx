import { motion } from 'framer-motion';
import { useAllDiscountCodes, useToggleDiscountCode } from '@/hooks';
import { Card, CardContent, Badge, Button, Spinner } from '@/components/ui';
import { ErrorFallback } from '@/components/feedback';
import { EmptyState } from '@/components/feedback/EmptyState';
import { getApiError, formatDate } from '@/lib/utils';
import { Power, PowerOff } from 'lucide-react';

export default function AdminDiscountCodesPage() {
  const { data: codes = [], isLoading, isError, error, refetch } = useAllDiscountCodes();
  const toggleMutation = useToggleDiscountCode();

  const handleToggle = (codeId: string) => {
    toggleMutation.mutate(codeId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl">
        <ErrorFallback message={getApiError(error)} onRetry={() => refetch()} />
      </div>
    );
  }

  if (codes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">Discount Codes</h1>
        <p className="mb-6 text-sm text-gray-500">Manage discount codes generated for approved applications</p>
        <EmptyState
          title="No discount codes yet"
          description="Discount codes are automatically generated when applications are approved."
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto max-w-4xl"
    >
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">Discount Codes</h1>
      <p className="mb-6 text-sm text-gray-500">Manage discount codes generated for approved applications</p>

      <div className="space-y-4">
        {codes.map((code) => (
          <Card key={code.id} className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <code className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-lg font-bold text-gray-900">
                      {code.code}
                    </code>
                    <Badge variant={code.active ? 'success' : 'default'} size="sm">
                      {code.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
                    <div>
                      <span className="text-xs text-gray-500">Business</span>
                      <p className="font-medium text-gray-900 truncate">{code.application.businessName}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Applicant</span>
                      <p className="font-medium text-gray-900 truncate">{code.application.user.name}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Discount</span>
                      <p className="font-medium text-gray-900">
                        {code.type === 'PERCENTAGE' ? `${code.value}%` : `$${code.value}`}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Uses</span>
                      <p className="font-medium text-gray-900">{code.usageCount}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">Created {formatDate(code.createdAt)}</p>
                </div>

                <Button
                  variant={code.active ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleToggle(code.id)}
                  isLoading={toggleMutation.isPending}
                >
                  {code.active ? (
                    <><PowerOff className="h-4 w-4" /> Deactivate</>
                  ) : (
                    <><Power className="h-4 w-4" /> Activate</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
