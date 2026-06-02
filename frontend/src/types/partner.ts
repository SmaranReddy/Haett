import type { DiscountCode } from './discount-code';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PartnerApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  partnerType: string;
  businessName: string;
  phone: string;
  socialLink: string | null;
  audienceSize: number;
  description: string | null;
  status: ApplicationStatus;
  rejectionReason: string | null;
  appliedAt: string;
  approvedAt: string | null;
  discountCode: DiscountCode | null;
}

export interface CreateApplicationRequest {
  partnerType: string;
  businessName: string;
  phone: string;
  socialLink?: string;
  audienceSize?: number;
  description?: string;
}

export type ReapplyRequest = CreateApplicationRequest;

export interface RejectApplicationRequest {
  reason: string;
}

export interface ApprovalResult {
  application: PartnerApplication;
  discountCode: {
    id: string;
    code: string;
    type: string;
    value: number;
    active: boolean;
  };
}
