import type { DiscountCode } from './discount-code';

export interface DashboardStats {
  totalCodes: number;
  totalCodeUses: number;
  totalDiscountGiven: number;
}

export interface DashboardResponse {
  partnerType: string;
  approvedAt: string;
  stats: DashboardStats;
  codes: DiscountCode[];
}
