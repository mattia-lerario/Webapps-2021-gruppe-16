import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { id, slot } = req.query
  const uid = parseInt(id, 10)
  const sid = parseInt(slot, 10)

  if (req.method === 'GET') {
    if (!uid) return res.status(404).json({ error: 'NaN value error' })

    const userslots = await prisma.userSlot.findMany({
      where: {
        userId: {
          equals: uid,
        },
        slotId: {
          equals: sid,
        },
      },
    })

    if (!userslots)
      return res.status(404).json({ error: 'failed to fetch userslots' })

    res.status(200).json(userslots[0])
  }

  return res.status(204)
}
