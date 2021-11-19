import prisma from '@/lib/clients/db'

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
  }
}
