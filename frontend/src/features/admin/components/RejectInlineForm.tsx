import { useState } from 'react';
import { Button, Textarea } from '@/components/ui';

interface RejectInlineFormProps {
  onSubmit: (reason: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function RejectInlineForm({ onSubmit, onCancel, isLoading }: RejectInlineFormProps) {
  const [reason, setReason] = useState('');
  const charsNeeded = 10 - reason.trim().length;
  const isValid = reason.trim().length >= 10;

  const handleSubmit = () => {
    if (!isValid || isLoading) return;
    onSubmit(reason.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-5 space-y-3 rounded-xl border border-red-200 bg-red-50/50 p-5" role="dialog" aria-label="Rejection reason form">
      <Textarea
        label="Rejection reason"
        placeholder="Explain why this application is being rejected (min. 10 characters)..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        error={
          reason.length > 0 && !isValid
            ? `Please enter at least ${charsNeeded} more character${charsNeeded !== 1 ? 's' : ''}`
            : undefined
        }
      />
      <div className="flex gap-3">
        <Button
          variant="danger"
          size="sm"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={!isValid}
        >
          Confirm Reject
        </Button>
        <Button variant="secondary" size="sm" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
