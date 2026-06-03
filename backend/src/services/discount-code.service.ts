import { NotFoundError } from "../utils/errors";
import { prisma } from "../utils";

export async function getAllDiscountCodes() {
  return prisma.discountCode.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      application: {
        select: {
          businessName: true,
          user: { select: { name: true, email: true } },
        },
      },
    },
  });
}

export async function toggleDiscountCodeActive(id: string) {
  const code = await prisma.discountCode.findUnique({ where: { id } });

  if (!code) {
    throw new NotFoundError("Discount code not found");
  }

  return prisma.discountCode.update({
    where: { id },
    data: { active: !code.active },
  });
}
