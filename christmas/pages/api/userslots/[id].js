import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { id } = req.query
  const uid = parseInt(id, 10)

  if (req.method === 'GET') {
    if (!uid) return res.status(404).json({ error: 'NaN value error' })

    const userslots = await prisma.userSlot.findMany({
      where: {
        userId: {
          equals: uid,
        },
      },
    })

    if (!userslots)
      return res.status(404).json({ error: 'failed to fetch userslots' })

    res.status(200).json(userslots)
  }

  // POST
  if (req.method === 'POST') {
    const newUserSlot = await prisma.userslot.create({
      data: {
        coupon: req?.body?.coupon,
        createdAt: new Date(),
        slotId: req?.body?.slotId,
        userId: req?.body?.userId,
      },
    })

    console.log(newUserSlot)
    if (!newUserSlot) return res.status(400).json('failed to open userslot')

    return res.status(200).json(newUserSlot)
  }

  return res.status(204)
}
