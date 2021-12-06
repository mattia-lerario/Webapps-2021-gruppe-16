/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cid = parseInt(req.query.id, 10)

    if (!cid) return res.status(404).json({ error: 'NaN value error' })

    const slots = await prisma.slot.findMany({
      where: {
        calendarId: {
          equals: cid,
        },
      },
    })

    res.status(200).json(slots)
  }

  return res.status(204)
}
