'use client'

import Link from 'next/link'
import { Button } from '@cn/ui/button'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <>
      <nav className="fixed top-0 flex h-12 w-full items-center justify-center gap-4 bg-white p-4 shadow-md">
        <div className="flex gap-4">
          <Link className="hover:underline" href="/forms/list">
            List
          </Link>
          <Link className="hover:underline" href="/forms/vanilla">
            Vanilla
          </Link>
          <Link className="hover:underline" href="/forms/react">
            React
          </Link>
          <Link className="hover:underline" href="/forms/test">
            Test
          </Link>
        </div>
      </nav>
      <div>
        {/* Spacing so that elemets do not go under the Nevbar element which is posisioned as fixed */}
        <div className="h-20" />
      </div>
    </>
  )
}
