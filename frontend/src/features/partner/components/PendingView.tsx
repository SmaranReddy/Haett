import { motion } from 'framer-motion';
import { Clock, Mail, Calendar } from 'lucide-react';
import { Badge, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { StatusCard } from './StatusCard';
import { InfoRow } from './InfoRow';
import { formatDate } from '@/lib/utils';
import type { PartnerApplication } from '@/types';

interface PendingViewProps {
  application: PartnerApplication;
}

export function PendingView({ application }: PendingViewProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/20 via-white to-white px-6 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-amber-200/20 to-amber-400/5 blur-3xl" />
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
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/20"
          >
            <Clock className="h-8 w-8" />
          </motion.div>

          <div className="mb-6 text-center">
            <CardHeader className="mb-0">
              <CardTitle>Application Under Review</CardTitle>
              <CardDescription>
                We are reviewing your application and will get back to you soon
              </CardDescription>
            </CardHeader>
          </div>

          <div className="flex justify-center mb-6">
            <Badge variant="warning" size="md">
              Pending Review
            </Badge>
          </div>

          <div className="divide-y divide-gray-100 border-t border-gray-100">
            <InfoRow label="Business Name" value={application.businessName} />
            <InfoRow label="Partner Type" value={application.partnerType} />
            <InfoRow label="Applied" value={formatDate(application.appliedAt)} />
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-50/50 p-5 ring-1 ring-inset ring-amber-200/50">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed text-amber-800">
                Thank you for your interest in our partner program. Our team is carefully
                reviewing your application and we will notify you via email once a decision
                has been made. This typically takes 1-2 business days.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            Applied on {formatDate(application.appliedAt)}
          </div>
        </StatusCard>
      </motion.div>
    </div>
  );
}
