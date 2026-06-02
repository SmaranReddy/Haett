import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  children: ReactNode;
  className?: string;
}

export function StatusCard({ children, className }: StatusCardProps) {
  return (
    <Card
      padding="lg"
      className={cn('mx-auto w-full max-w-lg', className)}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
