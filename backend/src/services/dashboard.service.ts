import { ApplicationStatus } from "@prisma/client";
import { ForbiddenError } from "../utils/errors";
import { prisma } from "../utils";

export interface DashboardResponse {
  partnerType: string;
  approvedAt: Date;
  stats: {
    totalCodes: number;
    totalCodeUses: number;
    totalDiscountGiven: number;
  };
  codes: Array<{
    id: string;
    code: string;
    type: string;
    value: number;
    usageCount: number;
    totalDiscountAmount: number;
    active: boolean;
    expiresAt: Date | null;
    createdAt: Date;
  }>;
}

export async function getPartnerDashboard(userId: string): Promise<DashboardResponse> {
  const application = await prisma.partnerApplication.findFirst({
    where: {
      userId,
      status: ApplicationStatus.APPROVED,
    },
  });

  if (!application) {
    throw new ForbiddenError("Access denied. Only approved partners can view the dashboard.");
  }

  const [codes, stats] = await Promise.all([
    prisma.discountCode.findMany({
      where: { applicationId: application.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.discountCode.aggregate({
      where: { applicationId: application.id },
      _count: { id: true },
      _sum: { usageCount: true, totalDiscountAmount: true },
    }),
  ]);

  return {
    partnerType: application.partnerType,
    approvedAt: application.approvedAt!,
    stats: {
      totalCodes: stats._count.id,
      totalCodeUses: stats._sum.usageCount ?? 0,
      totalDiscountGiven: stats._sum.totalDiscountAmount ?? 0,
    },
    codes: codes.map((c) => ({
      id: c.id,
      code: c.code,
      type: c.type,
      value: c.value,
      usageCount: c.usageCount,
      totalDiscountAmount: c.totalDiscountAmount,
      active: c.active,
      expiresAt: c.expiresAt,
      createdAt: c.createdAt,
    })),
  };
}
