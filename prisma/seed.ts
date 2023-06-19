import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.delete({
      where: { email: 'admin@example.com' },
    });
  } catch (err) {
    console.error(err);
  }

  const password = await hash('StrongPassw0rd', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'Admin',
      password,
      isAdmin: true,
    },
  });

  console.log({ adminUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
