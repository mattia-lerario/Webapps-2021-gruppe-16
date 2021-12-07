// create a request that will be sent to the server get and post for the user slot
export default async function userSlots(req, res) {
  // GET
  if (req.method === 'GET') {
    const userSlots = await prisma.userSlots.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    if (!userSlots) return res.status(404).json('failed to get userSlot')
    return res.status(200).json(userSlot)

    // POST
  } else if (req.method === 'POST') {
    let userSlot = await prisma.userSlot.findUnique({
      where: {
        name: req?.body?.id,
      },
    })
    let userId = userSlot.id

    const newUserSlot = await prisma.userSlot.create({
      data: {
        coupon: req?.body?.coupon,
        createdAt: new Date(),
        slotId: req?.body?.slotId,
        userId: userId,
      },
    })

    if (!newUserSlot) return res.status(400).json('failed to open Slot')
    return res.status(200).json(newUserSlot)
  }
}
