/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { id } = req.query
  const cid = parseInt(id, 10)

  if (req.method === 'GET') {
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
