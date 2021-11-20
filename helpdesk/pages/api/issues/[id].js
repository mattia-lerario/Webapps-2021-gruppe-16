import prisma from '@/lib/clients/db'
import { rest } from 'msw'

export default async function singleissue(req, res) {
  const { id } = req.query
  const iid = parseInt(id)

  if (req.method === 'GET') {
    let issue = await prisma.issue.findUnique({
      where: {
        id: iid,
      },
    })
    if (!issue) return res.status(404).json('failed to find issue')

    return res.status(200).json(issue)
  } else if (req.method === 'PUT') {
    // const { id } = req.query
    // const iid = parseInt(id) // - Could use either
    const iid = req?.body?.id // - Could use either

    let updatedIssue = await prisma.issue.update({
      where: {
        id: iid,
      },
      data: req?.body,
    })
    if (!updatedIssue) return rest.status(400).json('failed to update issue')

    return res.status(200).json(updatedIssue)
  }
}
