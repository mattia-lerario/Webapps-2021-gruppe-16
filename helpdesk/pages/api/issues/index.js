import prisma from '@/lib/clients/db'

export default async function issues(req, res) {
  if (req.method === 'GET') {
    const issues = await prisma.issue.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return res.status(200).json(issues)
  } else if (req.method === 'POST') {
    let department = await prisma.department.findUnique({
      where: {
        name: req?.body?.department,
      },
    })
    let departmentId = department.id

    const newIssue = await prisma.issue.create({
      data: {
        title: req?.body?.title,
        creator: req?.body?.creator,
        description: req?.body?.description,
        severity: req?.body?.severity,
        isResolved: false,
        createdAt: new Date(),
        departmentId: departmentId,
      },
    })
    return res.status(200).json(newIssue)
  }
}
