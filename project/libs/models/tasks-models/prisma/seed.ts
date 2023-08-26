import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Ремонт',
      tasks: {
        create: [
          {
            taskId: 1,
            title: 'Ремонт кухни',
            description: 'Нужно отремонтировать пол и потолок на кухне.',
            price: 1000,
            tillDate: new Date(),
            picture: '',
            address: 'Moscow, Cremlin',
            publishedAt: new Date(),
            tags: {
              create: [
                {
                  tagId: 1,
                  title: 'Квартирный вопрос'
                }
              ]
            },
            city: 'Moscow',
            userId: '13',
            comments: {
              create: [
                {
                  message: 'Wow',
                  userId: '14',
                }
              ]
            }
          },
        ]
      },
    }
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })