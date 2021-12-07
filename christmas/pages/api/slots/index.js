/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const slots = await prisma.slot.findMany({})

    if (!slots) return res.status(404).json({ error: 'No slots found' })

    return res.status(200).json(slots)
  }

  return res.status(204)
}
