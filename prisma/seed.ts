import { PrismaClient } from "@prisma/client";
import { articles, news, tradeSetups } from "../lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@tradingportal.test" },
    update: {},
    create: {
      email: "admin@tradingportal.test",
      name: "Portal Admin",
      role: "ADMIN"
    }
  });

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article
    });
  }

  for (const item of news) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: item,
      create: item
    });
  }

  await prisma.tradeSetup.deleteMany();
  await prisma.tradeSetup.createMany({
    data: tradeSetups.map((setup) => ({
      ...setup,
      entryPrice: setup.entryPrice,
      takeProfit: setup.takeProfit,
      stopLoss: setup.stopLoss
    }))
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
