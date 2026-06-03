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
      variant="glass-strong"
      padding="lg"
      className={cn('w-full', className)}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
