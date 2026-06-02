import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../utils/errors";

const prisma = new PrismaClient();

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
