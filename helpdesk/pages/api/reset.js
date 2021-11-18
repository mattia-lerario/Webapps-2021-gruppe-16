import prisma from '@/lib/clients/db'
import { issues } from '@/lib/issues'

export default async function handler(req, res) {
  const deleteIssue = prisma.issue.deleteMany()
  const deleteComment = prisma.comment.deleteMany()
  const deleteDepartment = prisma.department.deleteMany()

  await prisma.$transaction([deleteDepartment, deleteComment, deleteIssue])

  const newIssues = []
  const newComments = []
  const newDepartments = []

  // DEPARTMENTS
  const departments = ['it', 'design', 'salg']

  for (const department of departments) {
    await prisma.department.create({
      data: {
        name: department,
        createdAt: new Date(),
      },
    })
  }

  // ISSUES
  for (const issue of issues) {
    let department = await prisma.department.findUnique({
      where: {
        name: issue.department,
      },
    })
    let departmentId = department.id

    let newIssue = await prisma.issue.create({
      data: {
        title: issue.title,
        creator: issue.creator,
        description: issue.description,
        severity: issue.severity,
        isResolved: issue.isResolved,
        createdAt: new Date(issue.createdAt),
        departmentId: departmentId,
      },
    })

    if (issue?.comments) {
      for (const comment of issue.comments) {
        await prisma.comment.create({
          data: {
            comment: comment.comment,
            createdAt: new Date(comment.createdAt),
            issueId: newIssue.id,
          },
        })
      }
    }
  }

  res.status(200).json({ success: true, message: 'database reset' })
}
