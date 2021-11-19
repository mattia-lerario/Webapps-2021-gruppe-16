import prisma from '@/lib/clients/db'

export default async function issues(req, res) {
  // GET
  if (req.method === 'GET') {
    const issues = await prisma.issue.findMany({
      orderBy: {
        id: 'desc',
      },
    })

    if (!issues) return res.status(404).json('failed to get issues')
    return res.status(200).json(issues)

    // POST
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

    if (!newIssue) return res.status(400).json('failed to create issue')
    return res.status(200).json(newIssue)
  }
}
