import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  // GET
  if (req.method === 'GET') {
  }

  // POST
  if (req.method === 'POST') {
    const game = await prisma.game.create({
      data: {
        combination: req?.body?.combination,
        user: req?.body?.user,
      },
    })

    if (!game) return res.status(400).json('failed to create game')
    return res.status(200).json(game)
  }
}
