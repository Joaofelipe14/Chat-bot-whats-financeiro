// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.plano.createMany({
    data: [
      {
        nome: 'MENSAL',
        duracao: 30,
      },
      {
        nome: 'ANUAL',
        duracao: 365,
      },
    ],
  });

  console.log('Planos inseridos com sucesso!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
