import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { config } from "../src/config/env";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Seeding database...");

  // Clean all operational data first
  await prisma.discountCode.deleteMany({});
  await prisma.partnerApplication.deleteMany({});
  // Remove any users beyond the essential ones
  await prisma.user.deleteMany({
    where: { email: { notIn: [config.adminSeed.email, config.userSeed.email] } },
  });

  const adminPassword = await hashPassword(config.adminSeed.password);
  const userPassword = await hashPassword(config.userSeed.password);

  const admin = await prisma.user.upsert({
    where: { email: config.adminSeed.email },
    update: {
      password: adminPassword,
      role: Role.ADMIN,
    },
    create: {
      name: config.adminSeed.name,
      email: config.adminSeed.email,
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Admin created: ${admin.email} (${admin.role})`);

  const testUser = await prisma.user.upsert({
    where: { email: config.userSeed.email },
    update: {
      password: userPassword,
      role: Role.USER,
    },
    create: {
      name: config.userSeed.name,
      email: config.userSeed.email,
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log(`Test user created: ${testUser.email} (${testUser.role})`);

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
