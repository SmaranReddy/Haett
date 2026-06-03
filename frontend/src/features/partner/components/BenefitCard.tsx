import type { ReactNode } from 'react';

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]">
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-100/40 to-brand-200/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-inset ring-brand-200/70 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-brand-200/40">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
      <p className="text-base leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}
