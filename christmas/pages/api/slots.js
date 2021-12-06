/* eslint-disable consistent-return */
import prisma from '@/lib/clients/db'

export default async function slots(req, res) {
  const { calenderId } = req.query

  if (req.method.toLowerCase() === 'get') {
    if (!Number(calenderId)) {
      return res.status(400).json({
        success: false,
        error: `${calenderId} er ikke et tall`,
      })
    }
    const slots = await prisma.slot.findMany({
<<<<<<< Updated upstream
      where: {
        calender: {
          is: {
            id: Number(calenderId),
          },
        },
=======
      orderBy: {
        id: 'desc',
>>>>>>> Stashed changes
      },
    })

    return res.status(200).json(slots)
  } else {
    res.status(405).end()
  }
}
