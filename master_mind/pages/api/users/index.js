// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUserFromCookie } from '@/lib/utils/api'

export default async function handler(req, res) {
  // Funksjon brukt for å hente ut hvem som prøver applikasjone
  // Du kan kopiere denne linjen til dere du måtte trenge den
  // Trenger den for å knytte brukeren som spiller til spillet
  const user = await getUserFromCookie(req)
  res.status(200).json(user)
}
