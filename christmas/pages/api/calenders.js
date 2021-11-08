import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { name } = req.query

  if (req.method.toLowerCase() === 'get') {
    const calender = await prisma.calender.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        slot: true,
      },
    })

    res.status(200).json({ success: true, data: calender })
  }
}
