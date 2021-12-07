// create a request that will be sent to the server get and post for the user slot
import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  // GET
  if (req.method === 'GET') {
    const userSlots = await prisma.userSlot.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!userSlots) return res.status(200).json('No slots found userSlot')
    return res.status(200).json(userSlots)

    // POST
  } else if (req.method === 'POST') {
    const newUserSlot = await prisma.userSlot.create({
      data: {
        coupon: req?.body?.coupon,
        createdAt: new Date(),
        slotId: req?.body?.slotId,
        userId: req?.body?.userId,
      },
    })
    console.log(newUserSlot)
    if (!newUserSlot) return res.status(400).json('failed to open Slot')
    return res.status(200).json(newUserSlot)
  }
}
