import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const calendar = await prisma.calendar.findMany({})

    if (!calendar) return res.status(404).json({ message: 'No calendar found' })

    return res.status(200).json(calendar)
  }

  return res.status(204)
}
