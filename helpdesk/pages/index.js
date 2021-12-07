import { useEffect } from 'react'
import { useRouter } from 'next/router'

/*
  This code is taken directly from next/router docs 
  and is only used as a placeholder since the assignment
  doesn't specify what the root location should be used for.
*/

const useUser = () => ({ user: null, loading: false })

export default function Home() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/issues')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}
