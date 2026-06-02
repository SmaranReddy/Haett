import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent } from '@/components/ui';
import { BenefitCard } from './BenefitCard';
import { ROUTES } from '@/utils/constants';
import { useAuthStore } from '@/store/auth.store';

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

export function LandingView() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              P
            </div>
            <span className="text-lg font-semibold text-gray-900">Partner Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.PARTNER)}>
                Dashboard
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
                Partner Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn Your Network Into
              <span className="mt-1 block text-brand-600">Revenue</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Join our affiliate partner program and earn competitive commissions by referring customers.
              Access real-time tracking, marketing materials, and dedicated support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate(ROUTES.REGISTER)}>
                Apply Now
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => navigate(ROUTES.LOGIN)}>
                Partner Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Partner With Us</h2>
            <p className="mt-3 text-gray-600">
              Everything you need to build a successful referral business
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">How It Works</h2>
            <p className="mt-3 text-gray-600">Three simple steps to start earning</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card padding="lg" className="mx-auto max-w-2xl border-brand-200 bg-gradient-to-br from-brand-50 to-white text-center">
            <CardContent>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Ready to Get Started?</h2>
              <p className="mt-3 text-sm text-gray-600 sm:text-base">
                Join hundreds of successful partners earning commissions every day.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate(ROUTES.REGISTER)}>
                  Create Your Account
                </Button>
                <Button size="lg" variant="ghost" className="w-full sm:w-auto" onClick={() => navigate(ROUTES.LOGIN)}>
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
