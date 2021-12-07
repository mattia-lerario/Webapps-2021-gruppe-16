import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  switch (req.method.toLowerCase()) {
    case 'get': {
      const users = await prisma.user.findMany()

      return res.status(200).json(users)
    }
    default:
      return res.status(405).end()
  }
}
