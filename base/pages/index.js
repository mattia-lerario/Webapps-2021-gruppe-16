import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Henvendelser</h1>
      <Link href="/news/[id]" as="/news/1">
        <a>News 1</a>
      </Link>
      <Link href="/news/[id]" as="/news/2">
        <a>News 2</a>
      </Link>
      <Link href="/news/[id]" as="/news/3">
        <a>News 3</a>
      </Link>
    </div>
  )
}
