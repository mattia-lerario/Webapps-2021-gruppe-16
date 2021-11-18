import prisma from '@/lib/clients/db'

export default async function comments(req, res) {
  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return res.status(200).json({ success: true, comments })
  }
}
