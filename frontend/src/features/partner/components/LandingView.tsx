import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Tag, TrendingUp, DollarSign, Clock, ArrowRight, CheckCircle, Shield, Zap, BarChart3, RefreshCw, Menu, X } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { BenefitCard } from './BenefitCard';
import { ROUTES } from '@/utils/constants';
import { useAuthStore } from '@/store/auth.store';
import { usePlatformStats } from '@/hooks/use-public';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { useState } from 'react';

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Competitive Commissions',
    description: 'Earn generous recurring commissions on every sale you refer. Our tiered structure rewards high performers.',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Real-Time Tracking',
    description: 'Access detailed analytics and performance metrics through your dedicated partner dashboard.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Dedicated Support',
    description: 'Work closely with your account manager to optimize campaigns and maximize your earning potential.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Easy Onboarding',
    description: 'Get started in minutes with our streamlined application process. No complex paperwork required.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply Online',
    description: 'Complete our simple application form with your business details.',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    number: '02',
    title: 'Get Reviewed',
    description: 'Our team reviews your application and provides feedback within 48 hours.',
    icon: <CheckCircle className="h-5 w-5" />,
  },
  {
    number: '03',
    title: 'Start Promoting',
    description: 'Once approved, access your dashboard, generate discount codes, and start earning.',
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`rounded-xl border border-gray-200/70 bg-white p-4 ${i === 4 ? 'col-span-2' : ''}`}>
          <Skeleton className="mb-3 h-10 w-10 rounded-xl" />
          <Skeleton className="mb-1.5 h-7 w-20" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, formatter }: { value: number; formatter: (v: number) => string }) {
  const displayValue = value > 0 ? formatter(value) : '0';
  return <span className="text-2xl font-bold tracking-tight text-gray-900">{displayValue}</span>;
}

function EmptyStatCard({ icon, message, gradient }: { icon: React.ReactNode; message: string; gradient: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative overflow-hidden rounded-xl border border-gray-200/60 bg-gray-50/30 p-4"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03]`} />
      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
          {icon}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, formatter, gradient }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  formatter: (v: number) => string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm shadow-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06]"
    >
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${gradient}`} />
      <div className="relative z-10">
        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-sm text-white transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <AnimatedCounter value={value} formatter={formatter} />
        <p className="mt-0.5 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

function StatsGrid() {
  const { data: stats, isLoading } = usePlatformStats();

  if (isLoading) return <StatsSkeleton />;

  type CardConfig = {
    icon: React.ReactNode;
    label: string;
    value: number;
    formatter: (v: number) => string;
    gradient: string;
    emptyMessage: string;
    isEmpty: boolean;
  };

  const cards: CardConfig[] = [
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Approved Partners',
      value: stats?.totalApprovedPartners ?? 0,
      formatter: formatNumber,
      gradient: 'from-brand-500 to-brand-600',
      emptyMessage: 'Awaiting first approved partner',
      isEmpty: !stats || stats.totalApprovedPartners === 0,
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: 'Active Discount Codes',
      value: stats?.totalDiscountCodes ?? 0,
      formatter: formatNumber,
      gradient: 'from-indigo-500 to-indigo-600',
      emptyMessage: 'No active codes yet',
      isEmpty: !stats || stats.totalDiscountCodes === 0,
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: 'Total Code Uses',
      value: stats?.totalCodeUses ?? 0,
      formatter: formatNumber,
      gradient: 'from-emerald-500 to-emerald-600',
      emptyMessage: 'No customer redemptions yet',
      isEmpty: !stats || stats.totalCodeUses === 0,
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: 'Customer Savings',
      value: stats?.totalSavingsGiven ?? 0,
      formatter: (v) => formatCurrency(v),
      gradient: 'from-violet-500 to-violet-600',
      emptyMessage: 'Customer savings will appear once codes are redeemed',
      isEmpty: !stats || stats.totalSavingsGiven === 0,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Pending Reviews',
      value: stats?.pendingApplications ?? 0,
      formatter: formatNumber,
      gradient: 'from-amber-500 to-amber-600',
      emptyMessage: 'No pending reviews',
      isEmpty: !stats || stats.pendingApplications === 0,
    },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 gap-3">
      {cards.map((card, i) => (
        <div key={card.label} className={i === cards.length - 1 ? 'col-span-2' : ''}>
          {card.isEmpty ? (
            <EmptyStatCard icon={card.icon} message={card.emptyMessage} gradient={card.gradient} />
          ) : (
            <StatCard icon={card.icon} label={card.label} value={card.value} formatter={card.formatter} gradient={card.gradient} />
          )}
        </div>
      ))}
    </motion.div>
  );
}

function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="border-t border-gray-100 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            Partner Program
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl leading-[1.15]">
            Start earning through partnerships
          </h2>

          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            Join creators, gyms, influencers, and businesses using the platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[180px] text-base"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Apply Now
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[140px] text-base"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Sign In
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Fast approvals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Real-time dashboard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Discount code management</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingView() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm glow">
              P
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">Partner Portal</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How it works</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ADMIN_LOGIN)}>
              Admin Login
            </Button>
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.PARTNER)}>
                Dashboard
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
                Sign In
              </Button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden -mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 md:hidden"
            >
              <div className="space-y-1 px-6 py-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">Features</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">How it works</a>
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setMobileMenuOpen(false); navigate(ROUTES.ADMIN_LOGIN); }}>Admin Login</Button>
                  {isAuthenticated ? (
                    <Button variant="primary" size="sm" onClick={() => { setMobileMenuOpen(false); navigate(ROUTES.PARTNER); }}>Dashboard</Button>
                  ) : (
                    <Button size="sm" onClick={() => { setMobileMenuOpen(false); navigate(ROUTES.LOGIN); }}>Sign In</Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
      </motion.header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-brand-200/30 to-brand-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-indigo-200/20 to-brand-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-brand-500" />
                Partner program &mdash; now accepting applications
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-[1.05]">
                Turn Your Network Into
                <span className="mt-3 block text-gradient-hero">Revenue</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-lg">
                Join our affiliate partner program and earn competitive commissions by referring customers.
                Access real-time tracking, marketing materials, and dedicated support.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px] text-base shadow-lg shadow-brand-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-[160px] text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign In
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full"
            >
              <div className="relative">
                <div className="relative rounded-2xl border border-gray-200/80 bg-white/60 backdrop-blur-sm p-5 shadow-xl shadow-black/[0.08] ring-1 ring-gray-100/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/[0.10]">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-sm">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Platform Overview</p>
                      <p className="text-xs text-gray-500">Live statistics</p>
                    </div>
                  </div>
                  <StatsGrid />
                </div>
                <div className="absolute -bottom-8 -right-8 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-brand-200/30 to-brand-400/10 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-gray-100 bg-surface-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
              Why Partner With Us
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Build a successful referral business with our comprehensive toolkit
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2"
          >
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} variants={fadeUp}>
                <BenefitCard {...benefit} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-gray-100 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three simple steps
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              From application to earning in just a few days
            </p>
          </motion.div>
          <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-brand-200" aria-hidden="true" />
                )}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-xl font-bold text-brand-600 ring-1 ring-inset ring-brand-300/50 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-brand-200/40 hover:scale-105">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-400/10 to-brand-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{step.number}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900">{step.title}</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-500 max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
