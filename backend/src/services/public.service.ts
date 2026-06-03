import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../utils";

export interface PlatformStatsResponse {
  totalApprovedPartners: number;
  totalDiscountCodes: number;
  totalCodeUses: number;
  totalSavingsGiven: number;
  pendingApplications: number;
}

export async function getPlatformStats(): Promise<PlatformStatsResponse> {
  const [
    totalApprovedPartners,
    totalDiscountCodes,
    discountCodeStats,
    pendingApplications,
  ] = await Promise.all([
    prisma.partnerApplication.count({
      where: { status: ApplicationStatus.APPROVED },
    }),
    prisma.discountCode.count({
      where: { active: true },
    }),
    prisma.discountCode.aggregate({
      _sum: { usageCount: true, totalDiscountAmount: true },
    }),
    prisma.partnerApplication.count({
      where: { status: ApplicationStatus.PENDING },
    }),
  ]);

  return {
    totalApprovedPartners,
    totalDiscountCodes,
    totalCodeUses: discountCodeStats._sum.usageCount ?? 0,
    totalSavingsGiven: discountCodeStats._sum.totalDiscountAmount ?? 0,
    pendingApplications,
  };
}
