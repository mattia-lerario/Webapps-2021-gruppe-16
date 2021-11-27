import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    let updated = await prisma.game.update({
      where: {
        id: req?.body?.id,
      },
      data: {
        ...req?.body,
        combination: req?.body?.combination.join(' '),
      },
    })

    if (!updated) return res.status(400).json('failed to update game')
    return res.status(200).json(updated)
  }
}
