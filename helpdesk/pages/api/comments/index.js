import prisma from '@/lib/clients/db'

export default async function comments(req, res) {
  // GET
  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    if (!comments) return res.status(404).json('failed to get comments')
    return res.status(200).json(comments)

    // POST
  } else if (req.method === 'POST') {
    const newComment = await prisma.comment.create({
      data: {
        comment: req?.body?.comment,
        createdAt: new Date(),
        issueId: req?.body?.issueId,
      },
    })
    if (!newComment) return res.status(400).json('failed to create comment')
    return res.status(200).json(newComment)
  }
}
