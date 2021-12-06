import Link from 'next/link'

export const Navigation = () => {
  return (
    <ul className="navigation">
      <Link href="/issues">
        <a>Henvendelser</a>
      </Link>
      <Link href="/issues/create">
        <a>Ny henvendelse</a>
      </Link>
    </ul>
  )
}

export default Navigation
