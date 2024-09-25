'use client'

import Link from 'next/link'
import { NavMenu } from './NavMenu'

export default function Header() {
  return (
    <>
      <nav className="fixed top-0 flex h-12 w-full items-center justify-center gap-4 bg-white p-4 shadow-md">
        <NavMenu />
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
          <Link className="hover:underline" href="/forms/react_dnd">
            React+DND
          </Link>
          <Link className="hover:underline" href="/forms/scratch">
            Sratch
          </Link>
          <Link className="hover:underline" href="/forms/scratch_base">
            SratchBase
          </Link>
          <Link className="hover:underline" href="/forms/test">
            TestFormTypes
          </Link>
          <Link className="hover:underline" href="/forms/test/render_test">
            TestRender
          </Link>
        </div>
      </nav>
    </>
  )
}
