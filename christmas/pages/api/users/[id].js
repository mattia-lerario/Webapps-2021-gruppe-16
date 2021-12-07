import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  const { id } = req.query
  const userId = parseInt(id, 10)
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) return res.status(404).json({ error: 'No user found' })

    return res.status(200).json(user)
  }

  return res.status(204)
}
