import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@/components/ui';
import { BenefitCard } from './BenefitCard';
import { ROUTES } from '@/utils/constants';
import { useAuthStore } from '@/store/auth.store';
import { usePlatformStats } from '@/hooks/use-public';
import { formatNumber, formatCurrency } from '@/lib/utils';

const benefits = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Competitive Commissions',
    description: 'Earn generous recurring commissions on every sale you refer. Our tiered structure rewards high performers.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Real-Time Tracking',
    description: 'Access detailed analytics and performance metrics through your dedicated partner dashboard.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Dedicated Support',
    description: 'Work closely with your account manager to optimize campaigns and maximize your earning potential.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Easy Onboarding',
    description: 'Get started in minutes with our streamlined application process. No complex paperwork required.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply Online',
    description: 'Complete our simple application form with your business details.',
  },
  {
    number: '02',
    title: 'Get Reviewed',
    description: 'Our team reviews your application and provides feedback within 48 hours.',
  },
  {
    number: '03',
    title: 'Start Promoting',
    description: 'Once approved, access your dashboard, generate discount codes, and start earning.',
  },
];

interface StatCardData {
  label: string;
  value: number;
  formatter: (v: number) => string;
  icon: React.ReactNode;
  gradient: string;
  ringColor: string;
  emptyLabel: string;
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-xl border border-gray-200/70 bg-white p-4 ${i === 4 ? 'col-span-2' : ''}`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100" />
          <Skeleton className="mb-1.5 h-7 w-20" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value, formatter, icon, gradient, ringColor, emptyLabel }: StatCardData) {
  const displayValue = value > 0 ? formatter(value) : '0';
  const displayLabel = value > 0 ? label : emptyLabel;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm shadow-black/[0.02] ring-1 ring-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04]`}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      </div>
      <div className="relative z-10">
        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} ${ringColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <p className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-gray-900">
          {displayValue}
        </p>
        <p className="mt-0.5 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
          {displayLabel}
        </p>
      </div>
    </div>
  );
}

function StatsGrid() {
  const { data: stats, isLoading } = usePlatformStats();

  if (isLoading) return <StatsSkeleton />;

  const cards: StatCardData[] = [
    {
      label: 'Approved Partners',
      value: stats?.totalApprovedPartners ?? 0,
      formatter: formatNumber,
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      gradient: 'from-brand-500 to-brand-600',
      ringColor: 'ring-1 ring-brand-300/50',
      emptyLabel: '0 Partners Onboarded Yet',
    },
    {
      label: 'Active Discount Codes',
      value: stats?.totalDiscountCodes ?? 0,
      formatter: formatNumber,
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-indigo-600',
      ringColor: 'ring-1 ring-indigo-300/50',
      emptyLabel: '0 Codes Generated Yet',
    },
    {
      label: 'Total Code Uses',
      value: stats?.totalCodeUses ?? 0,
      formatter: formatNumber,
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-emerald-600',
      ringColor: 'ring-1 ring-emerald-300/50',
      emptyLabel: '0 Uses Recorded Yet',
    },
    {
      label: 'Customer Savings',
      value: stats?.totalSavingsGiven ?? 0,
      formatter: (v) => formatCurrency(v),
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-violet-500 to-violet-600',
      ringColor: 'ring-1 ring-violet-300/50',
      emptyLabel: '0 Savings Given Yet',
    },
    {
      label: 'Pending Reviews',
      value: stats?.pendingApplications ?? 0,
      formatter: formatNumber,
      icon: (
        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-amber-600',
      ringColor: 'ring-1 ring-amber-300/50',
      emptyLabel: '0 Reviews Pending',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <div key={card.label} className={card.label === 'Pending Reviews' ? 'col-span-2' : ''}>
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
}

export function LandingView() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white shadow-sm shadow-brand-200">
              P
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">Partner Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.PARTNER)}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/40 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-brand-200/20 to-brand-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 items-start">
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-300/50 bg-brand-50/80 px-4 py-1.5 text-sm font-semibold text-brand-800 shadow-sm animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                Partner program &mdash; now accepting applications
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 lg:text-6xl leading-[1.08]">
                Turn Your Network Into
                <span className="mt-2 block text-brand-600">Revenue</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-gray-600">
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
                </Button>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="inline-flex items-center gap-1.5 px-1 py-3 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
                >
                  Sign In
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:pl-4 w-full">
              <div className="relative">
                <div className="relative rounded-2xl border border-gray-200/80 bg-white/60 backdrop-blur-sm p-5 shadow-xl shadow-black/[0.08] ring-1 ring-gray-100/50">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
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
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-surface-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
              Why Partner With Us
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Build a successful referral business with our comprehensive toolkit
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1 text-xs font-semibold text-gray-700">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three simple steps
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              From application to earning in just a few days
            </p>
          </div>
          <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dotted border-brand-200" aria-hidden="true" />
                )}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-xl font-bold text-brand-600 ring-1 ring-inset ring-brand-300/50 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-brand-200/40 hover:scale-105">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-gray-900">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600 max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-surface-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-8 py-16 text-center shadow-xl shadow-brand-600/20 sm:px-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/[0.04] blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Get Started?</h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-brand-100">
                Join our growing network of partners and start earning competitive commissions.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <Button
                  size="lg"
                  className="min-w-[180px] bg-white text-brand-700 hover:bg-gray-100 hover:text-brand-800 shadow-lg shadow-black/20 text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
