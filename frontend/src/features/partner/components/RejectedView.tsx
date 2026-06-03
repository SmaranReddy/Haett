import { motion } from 'framer-motion';
import { XCircle, RefreshCw, Calendar } from 'lucide-react';
import { Badge, Button, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { StatusCard } from './StatusCard';
import { InfoRow } from './InfoRow';
import { formatDate } from '@/lib/utils';
import type { PartnerApplication } from '@/types';

interface RejectedViewProps {
  application: PartnerApplication;
  onReapply: () => void;
}

export function RejectedView({ application, onReapply }: RejectedViewProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-red-50/20 via-white to-white px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-red-200/20 to-red-400/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <StatusCard>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg shadow-red-500/20"
          >
            <XCircle className="h-8 w-8" />
          </motion.div>

          <div className="mb-6 text-center">
            <CardHeader className="mb-0">
              <CardTitle>Application Not Approved</CardTitle>
              <CardDescription>
                Unfortunately, we were unable to approve your application at this time
              </CardDescription>
            </CardHeader>
          </div>

          <div className="flex justify-center mb-6">
            <Badge variant="danger" size="md">
              Not Approved
            </Badge>
          </div>

          <div className="divide-y divide-gray-100 border-t border-gray-100">
            <InfoRow label="Business Name" value={application.businessName} />
            <InfoRow label="Partner Type" value={application.partnerType} />
            <InfoRow label="Submitted" value={formatDate(application.appliedAt)} />
          </div>

          {application.rejectionReason && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-50/50 p-5"
            >
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-red-700">
                Reason
              </p>
              <p className="text-sm leading-relaxed text-red-800">
                {application.rejectionReason}
              </p>
            </motion.div>
          )}

          <div className="mt-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 ring-1 ring-inset ring-gray-200/50">
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Don&apos;t be discouraged. You can update your information and resubmit your
              application for another review. Make sure your business details are accurate
              and complete before reapplying.
            </p>
            <Button size="lg" className="w-full" onClick={onReapply}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Reapply Now
            </Button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            Submitted on {formatDate(application.appliedAt)}
          </div>
        </StatusCard>
      </motion.div>
    </div>
  );
}
