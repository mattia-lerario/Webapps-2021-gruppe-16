import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { id } = req.query
  const calendarId = parseInt(id, 10)

  if (!calendarId) return res.status(404).json({ error: 'NaN error' })

  if (req.method === 'GET') {
    const calendar = await prisma.calendar.findUnique({
      where: {
        id: calendarId,
      },
    })

    if (!calendar) return res.status(404).json({ error: 'No calendar found' })

    return res.status(200).json(calendar)
  }

  return res.status(204)
}
