export default async function handler(req, res) {
  switch (req.method.toLowerCase()) {
    case 'get': {
      const issues = await prisma.issues.findMany()

      return res.status(200).json({ success: true, issues })
    }
    default:
      return res.status(405).end()
  }
}
