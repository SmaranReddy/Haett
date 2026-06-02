import { PrismaClient, ApplicationStatus } from "@prisma/client";
import { BadRequestError, ConflictError, NotFoundError } from "../utils/errors";
import { generateDiscountCode } from "../utils/discount-code";

const prisma = new PrismaClient();

export interface CreateApplicationData {
  partnerType: string;
  businessName: string;
  phone: string;
  socialLink?: string;
  audienceSize?: number;
  description?: string;
}

interface ApplicationResult {
  id: string;
  userId: string;
  partnerType: string;
  businessName: string;
  phone: string;
  socialLink: string | null;
  audienceSize: number;
  description: string | null;
  status: string;
  rejectionReason: string | null;
  appliedAt: Date;
  approvedAt: Date | null;
}

interface ApprovalResult {
  application: ApplicationResult;
  discountCode: {
    id: string;
    code: string;
    type: string;
    value: number;
    active: boolean;
  };
}

async function assertNoActiveApplication(userId: string): Promise<void> {
  const existing = await prisma.partnerApplication.findFirst({
    where: {
      userId,
      status: { not: ApplicationStatus.REJECTED },
    },
  });

  if (existing) {
    if (existing.status === ApplicationStatus.PENDING) {
      throw new ConflictError("You already have a pending application");
    }
    if (existing.status === ApplicationStatus.APPROVED) {
      throw new BadRequestError("You already have an approved application");
    }
  }
}

export async function createApplication(
  userId: string,
  data: CreateApplicationData
): Promise<ApplicationResult> {
  await assertNoActiveApplication(userId);

  const application = await prisma.partnerApplication.create({
    data: {
      userId,
      partnerType: data.partnerType,
      businessName: data.businessName,
      phone: data.phone,
      socialLink: data.socialLink || null,
      audienceSize: data.audienceSize ?? 0,
      description: data.description || null,
      status: ApplicationStatus.PENDING,
    },
  });

  return application;
}

export async function getMyApplication(userId: string): Promise<ApplicationResult> {
  const application = await prisma.partnerApplication.findFirst({
    where: { userId },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    throw new NotFoundError("No application found");
  }

  return application;
}

export async function getAllApplications(status?: string) {
  const where: Record<string, unknown> = {};
  if (status) {
    where.status = status;
  }

  const applications = await prisma.partnerApplication.findMany({
    where,
    orderBy: { appliedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      discountCode: true,
    },
  });

  return applications.map((app) => ({
    id: app.id,
    userId: app.userId,
    name: app.user.name,
    email: app.user.email,
    partnerType: app.partnerType,
    businessName: app.businessName,
    phone: app.phone,
    socialLink: app.socialLink,
    audienceSize: app.audienceSize,
    description: app.description,
    status: app.status,
    rejectionReason: app.rejectionReason,
    appliedAt: app.appliedAt,
    approvedAt: app.approvedAt,
    discountCode: app.discountCode,
  }));
}

export async function approveApplication(applicationId: string) {
  const application = await prisma.partnerApplication.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new NotFoundError("Application not found");
  }

  if (application.status !== ApplicationStatus.PENDING) {
    throw new BadRequestError(
      `Cannot approve application with status ${application.status.toLowerCase()}`
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.partnerApplication.update({
      where: { id: applicationId },
      data: {
        status: ApplicationStatus.APPROVED,
        approvedAt: new Date(),
      },
    });

    const code = await generateDiscountCode(tx);

    const discountCode = await tx.discountCode.create({
      data: {
        applicationId: updated.id,
        code,
        type: "PERCENTAGE",
        value: 20,
        active: true,
        usageCount: 0,
        totalDiscountAmount: 0,
      },
    });

    const user = await tx.user.findUnique({
      where: { id: updated.userId },
      select: { name: true, email: true },
    });

    return {
      application: {
        id: updated.id,
        userId: updated.userId,
        name: user!.name,
        email: user!.email,
        partnerType: updated.partnerType,
        businessName: updated.businessName,
        phone: updated.phone,
        socialLink: updated.socialLink,
        audienceSize: updated.audienceSize,
        description: updated.description,
        status: updated.status,
        rejectionReason: updated.rejectionReason,
        appliedAt: updated.appliedAt,
        approvedAt: updated.approvedAt,
        discountCode: {
          id: discountCode.id,
          code: discountCode.code,
          type: discountCode.type,
          value: discountCode.value,
          active: discountCode.active,
          usageCount: discountCode.usageCount,
          totalDiscountAmount: discountCode.totalDiscountAmount,
          expiresAt: discountCode.expiresAt,
          createdAt: discountCode.createdAt,
        },
      },
      discountCode: {
        id: discountCode.id,
        code: discountCode.code,
        type: discountCode.type,
        value: discountCode.value,
        active: discountCode.active,
      },
    };
  });

  return result;
}

export async function rejectApplication(
  applicationId: string,
  reason: string
) {
  const application = await prisma.partnerApplication.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new NotFoundError("Application not found");
  }

  if (application.status !== ApplicationStatus.PENDING) {
    throw new BadRequestError(
      `Cannot reject application with status ${application.status.toLowerCase()}`
    );
  }

  const updated = await prisma.partnerApplication.update({
    where: { id: applicationId },
    data: {
      status: ApplicationStatus.REJECTED,
      rejectionReason: reason,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: updated.userId },
    select: { name: true, email: true },
  });

  return {
    id: updated.id,
    userId: updated.userId,
    name: user!.name,
    email: user!.email,
    partnerType: updated.partnerType,
    businessName: updated.businessName,
    phone: updated.phone,
    socialLink: updated.socialLink,
    audienceSize: updated.audienceSize,
    description: updated.description,
    status: updated.status,
    rejectionReason: updated.rejectionReason,
    appliedAt: updated.appliedAt,
    approvedAt: updated.approvedAt,
    discountCode: null,
  };
}

export async function reapply(
  userId: string,
  data: CreateApplicationData
): Promise<ApplicationResult> {
  const application = await prisma.partnerApplication.findFirst({
    where: {
      userId,
      status: ApplicationStatus.REJECTED,
    },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    throw new BadRequestError(
      "No rejected application found. You can only reapply after rejection."
    );
  }

  return prisma.partnerApplication.update({
    where: { id: application.id },
    data: {
      partnerType: data.partnerType,
      businessName: data.businessName,
      phone: data.phone,
      socialLink: data.socialLink || null,
      audienceSize: data.audienceSize ?? 0,
      description: data.description || null,
      status: ApplicationStatus.PENDING,
      rejectionReason: null,
    },
  });
}
