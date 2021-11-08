/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { calenderId } = req.query

  if (req.method.toLowerCase() === 'get') {
    if (!Number(calenderId)) {
      return res.status(400).json({
        success: false,
        error: `${calenderId} er ikke et tall`,
      })
    }
    const slots = await prisma.slot.findMany({
      where: {
        calender: {
          is: {
            id: Number(calenderId),
          },
        },
      },
    })

    res.status(200).json({ success: true, data: slots })
  } else {
    res.status(405).end()
  }
}
