import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-md shadow-brand-600/20 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-700/25 active:bg-brand-800 active:shadow-sm focus-visible:ring-brand-500',
  secondary:
    'bg-white text-gray-800 ring-1 ring-inset ring-gray-300 shadow-sm shadow-black/[0.02] hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 focus-visible:ring-gray-400',
  danger:
    'bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 hover:shadow-lg hover:shadow-red-700/25 active:bg-red-800 active:shadow-sm focus-visible:ring-red-500',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus-visible:ring-gray-400',
} as const;

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
