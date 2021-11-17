import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummydata

async function main() {
  console.log('Start seeding ...')

  const issues = await prisma.post.create({
    data: [
      {
        id: 1,
        title: 'Title one',
        creator: 'Marius Wallin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'salg',
        severity: 'low',
        isResolved: false,
        createdAt: new Date(2021, 11, 22).toLocaleDateString(),
      },
      {
        id: 2,
        title: 'Title one',
        creator: 'Marius Wallin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'salg',
        severity: 'medium',
        isResolved: false,
        createdAt: new Date(2021, 11, 22).toLocaleDateString(),
      },
      {
        id: 3,
        title: 'Title one',
        creator: 'Marius Wallin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'salg',
        severity: 'high',
        isResolved: false,
        createdAt: new Date(2021, 11, 22).toLocaleDateString(),
      },
      {
        id: 4,
        title: 'Title one',
        creator: 'Marius Wallin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'salg',
        severity: 'low',
        isResolved: false,
        createdAt: new Date(2021, 11, 22).toLocaleDateString(),
      },
      {
        id: 5,
        title: 'Title two',
        creator: 'Simen Simensen',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'design',
        severity: 'medium',
        isResolved: false,
        createdAt: new Date(2021, 11, 6).toLocaleDateString(),
        comments: [
          {
            id: 1,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
          },
          {
            id: 2,
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
          },
        ],
      },
      {
        id: 6,
        title: 'Title three',
        creator: 'Trude Trudesen',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
        department: 'design',
        severity: 'high',
        isResolved: false,
        createdAt: new Date(2021, 10, 12).toLocaleDateString(),
      },
    ],
  })
  console.log(`Created ${issues.id}`)
}

console.log('Seeding finished.')

main().finally(async () => await prisma.$disconnect())
