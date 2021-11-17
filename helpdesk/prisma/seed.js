import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//create issue with random data
const createIssue = async () => {
  const title = faker.lorem.sentence()
  const description = faker.lorem.paragraph()
  const severity = faker.random.arrayElement(['low', 'medium', 'high'])
  const department = faker.random.arrayElement(['it', 'design', 'salg'])
  const status = faker.random.arrayElement(['open', 'closed'])
  const openAt = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    12,
    0,
    0
  ).toISOString()

  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        severity,
        department,
        openAt,
      },
    })

    return issue
  } catch (error) {
    console.log(error)
  }
}

async function main() {
  console.log('Start seeding ...')
  // Kalle på seed funksjoner
  console.log('Seeding finished.')

  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
