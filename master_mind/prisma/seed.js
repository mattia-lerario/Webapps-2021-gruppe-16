import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // const colors = [
  //   { name: 'red' },
  //   { name: 'green' },
  //   { name: 'blue' },
  //   { name: 'yellow' },
  //   { name: 'orange' },
  //   { name: 'pink' },
  //   { name: 'cyan' },
  //   { name: 'gray' },
  // ]

  // for (const color of colors) {
  //   await prisma.color.create({
  //     data: color,
  //   })
  // }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
