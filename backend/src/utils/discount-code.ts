import { PrismaClient } from "@prisma/client";

export async function generateDiscountCode(
  client: Pick<PrismaClient, "discountCode">,
  prefix = "PRTN"
): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const maxRetries = 10;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    let suffix = "";
    for (let i = 0; i < 5; i++) {
      suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const code = `${prefix}-${suffix}`;
    const existing = await client.discountCode.findUnique({ where: { code } });
    if (!existing) {
      return code;
    }
  }

  throw new Error("Failed to generate unique discount code after maximum retries");
}
