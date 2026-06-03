import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={cn(
            'block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 caret-gray-900 shadow-sm transition-all duration-150 placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
            error
              ? 'border-red-300 text-red-900 focus-visible:border-red-500 focus-visible:ring-red-500/20'
              : 'border-gray-200 hover:border-gray-300 focus-visible:border-brand-500 focus-visible:ring-brand-500/20',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
