import prisma from '@/lib/clients/db'

export default async function departments(req, res) {
  if (req.method === 'GET') {
    const departments = await prisma.department.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    if (!departments) return res.status(404).json('failed to get departments')
    return res.status(200).json(departments)
  }
}
