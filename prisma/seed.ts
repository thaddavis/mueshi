import { prisma } from "@/prisma";

async function main() {
  const genre = await prisma.genre.upsert({
    where: { name: "blues" },
    update: {},
    create: {
      name: "blue",
    },
  });
  console.log({ genre });
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
