import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const calender = await prisma.calender.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    if (!calender) return res.status(404).json({ message: 'No calender found' })
    return res.status(200).json(calender)
  }
}
