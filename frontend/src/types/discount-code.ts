export interface DiscountCode {
  id: string;
  code: string;
  type: string;
  value: number;
  usageCount: number;
  totalDiscountAmount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}
