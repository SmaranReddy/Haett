import { motion } from 'framer-motion';
import { useAllApplications } from '@/hooks';
import { Card, CardContent, Spinner } from '@/components/ui';
import { Users, Clock, CheckCircle, XCircle, Tag } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; color: string }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full">
        <CardContent className="flex items-center gap-4 p-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-bold tracking-tight text-gray-900">{value.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const { data: applications = [], isLoading } = useAllApplications();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  const pending = applications.filter((a) => a.status === 'PENDING').length;
  const approved = applications.filter((a) => a.status === 'APPROVED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const discountCodes = applications.filter((a) => a.discountCode).length;

  const stats = [
    { icon: Users, label: 'Total Applications', value: applications.length, color: 'bg-blue-500' },
    { icon: Clock, label: 'Pending Review', value: pending, color: 'bg-yellow-500' },
    { icon: CheckCircle, label: 'Approved', value: approved, color: 'bg-green-500' },
    { icon: XCircle, label: 'Rejected', value: rejected, color: 'bg-red-500' },
    { icon: Tag, label: 'Discount Codes', value: discountCodes, color: 'bg-purple-500' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-5xl">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of partner applications and discount codes</p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {pending > 0 && (
        <motion.div variants={itemVariants} className="mt-8">
          <Card variant="glass" padding="lg">
            <CardContent className="p-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Applications awaiting review</p>
                  <p className="text-xs text-gray-500">
                    {pending} application{pending !== 1 ? 's' : ''} need{pending === 1 ? 's' : ''} your attention
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
