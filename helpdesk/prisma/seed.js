import { PrismaClient } from '@prisma/client'
import { issues } from '@/lib/issues'

const prisma = new PrismaClient()

//create issue with random data
const createIssue = async () => {
  const title = faker.lorem.sentence()
  const description = faker.lorem.paragraph()
  const severity = faker.random.arrayElement(['low', 'medium', 'high'])
  const department = faker.random.arrayElement(['it', 'design', 'salg'])
  const isResolved = faker.random.arrayElement([false, true])
  const createdAt = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    12,
    0,
    0
  ).toLocaleDateString()

  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        creator,
        description,
        department,
        severity,
        isResolved,
        createdAt,
      },
    })
    return issue
  } catch (error) {
    console.log(error)
  }
}

async function main() {
  console.log('Start seeding ...')
  // Seeding
  console.log('Seeding finished.')
}

main().finally(async () => await prisma.$disconnect())
