import prisma from '@/lib/clients/db'

export default async function departments(req, res) {
  if (req.method === 'GET') {
    const departments = await prisma.department.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return res.status(200).json(departments)
  }
}
