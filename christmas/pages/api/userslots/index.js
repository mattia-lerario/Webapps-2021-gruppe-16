import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  // if (req.method === 'GET') {
  //   const userslots = await prisma.userSlot.findMany({})

  //   if (!userslots)
  //     return res.status(404).json({ error: 'failed to fetch userslots' })

  //   res.status(200).json(userslots)
  // } else

  if (req.method === 'POST') {
    const newUserSlot = await prisma.userSlot.create({
      data: {
        coupon: req?.body?.data?.coupon,
        slotId: req?.body?.data?.slotId,
        userId: req?.body?.data?.userId,
      },
    })

    if (!newUserSlot) return res.status(400).json('failed to open userslot')

    return res.status(200).json(newUserSlot)
  }

  return res.status(204)
}
