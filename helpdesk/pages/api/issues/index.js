import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/clients/db'

export default function handler(req, res) {
  res.status(200).json({ message: 'Message from API' })

  if (req.method === 'GET') {
    const issues = await prisma.issue.findMany({
      orderBy: {
        id: 'desc',
      },
    })
    res.json(issues)
  }
}
