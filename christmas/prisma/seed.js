/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

const prisma = new PrismaClient()

const createUser = async () => {
  const username = faker.name.firstName().toLowerCase()

  try {
    const user = await prisma.user.create({
      data: {
        username,
        userSlots: {
          coupon,
          code,
          createdAt,
          slotId,
          userId: user.id,
        },
      },
    })

    return user
  } catch (error) {
    console.log(error)
  }
}

const createUsers = async (userCount) => {
  const userPromises = []

  for (let i = 0; i < userCount; i++) {
    const user = await createUser()

    userPromises.push(user)
  }

  await Promise.all(userPromises)
}

const createSlot = async (id, order) => {
  const slug = faker.lorem.slug()
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentDay = new Date().getDay()
  const openAt = new Date(
    currentYear,
    currentMonth,
    currentDay + order,
    12,
    0,
    0
  ).toISOString()

  try {
    const slot = await prisma.slot.create({
      data: {
        slug,
        order,
        openAt,
        calendar: {
          connect: {
            id,
          },
        },
      },
    })

    return slot
  } catch (error) {
    console.log(error)
  }
}

const createUserSlot = async () => {
  const coupon = 'abcd1234'
  const createdAt = new Date().toISOString()
  const slotId = faker.random.number()
  const userId = 1

  try {
    const userSlot = await prisma.userSlot.create({
      data: {
        coupon,
        createdAt,
        slotId,
        userId,
      },
    })

    return userSlot
  } catch (error) {
    console.log(error)
  }
}

const createSlots = async (id, slotCount) => {
  const slotPromises = []

  for (let i = 0; i < slotCount; i++) {
    const order = Number(i + 1)

    const slot = await createSlot(id, order)

    slotPromises.push(slot)
  }
  await Promise.all(slotPromises)
}

const createUserSlots = async (slotCount) => {
  const slotPromises = []

  for (let i = 0; i < slotCount; i++) {
    const order = Number(i + 1)

    const slot = await createUserSlot()

    slotPromises.push(slot)
  }
  await Promise.all(slotPromises)
}

const christmasCalendar = async () =>
  prisma.calendar.create({
    data: {
      name: 'Julekalender',
    },
  })

async function main() {
  console.log('Start seeding ...')
  await prisma.user.deleteMany({})
  await prisma.slot.deleteMany({})
  await prisma.calendar.deleteMany({})
  const calendar = await christmasCalendar()

  await createSlots(calendar.id, 24)
  await createUsers(10)
  await createUserSlots(5)
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
