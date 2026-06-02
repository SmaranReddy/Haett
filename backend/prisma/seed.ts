import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/utils/password";
import { config } from "../src/config/env";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("Seeding database...");

  const adminPassword = await hashPassword(config.adminSeed.password);
  const userPassword = await hashPassword(config.userSeed.password);

  const admin = await prisma.user.upsert({
    where: { email: config.adminSeed.email },
    update: {},
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
    update: {},
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
