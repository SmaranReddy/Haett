import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300',
  primary: 'bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-300',
  success: 'bg-green-50 text-green-800 ring-1 ring-inset ring-green-300',
  warning: 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-300',
  danger: 'bg-red-50 text-red-800 ring-1 ring-inset ring-red-300',
} as const;

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
} as const;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Badge({ className, variant = 'default', size = 'sm', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
