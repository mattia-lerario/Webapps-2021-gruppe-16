import prisma from '@/lib/clients/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const issues = await prisma.issue.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return res.status(200).json({ success: true, issues })
  }
}
