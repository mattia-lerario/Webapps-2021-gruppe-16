import prisma from '@/lib/clients/db'

export default async function comments(req, res) {
  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    return res.status(200).json(comments)
  } else if (req.method === 'POST') {
    const newComment = await prisma.comment.create({
      data: {
        comment: req?.body?.comment,
        createdAt: new Date(),
        issueId: req?.body?.issueId,
      },
    })
    return res.status(200).json(newComment)
  }
}
