import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@hoyl.com" },
    update: {},
    create: {
      id: 1,
      email: "admin@hoyl.com",
      names: "admin",
      lastNames: "admin",
      password: "$2a$08$4Q/Y32YRGXrjzuW469H6KuMED60lOEqjSvTR1JJuRgctZ.aVOKmEG"
    }
  });
  console.log({ admin });
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
