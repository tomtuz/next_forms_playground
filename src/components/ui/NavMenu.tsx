import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator
} from '@/cn/ui/menubar'
import React from 'react'
import Link from 'next/link'

export function NavMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>States</MenubarTrigger>
        <MenubarContent>
          <Link className="hover:underline" href="/test/state/zustand">
            <MenubarItem>Zustand</MenubarItem>
          </Link>

          <MenubarSeparator />
          <Link className="hover:underline" href="/test/state/jotai">
            <MenubarItem>Jotai</MenubarItem>
          </Link>

          <MenubarSeparator />
          <Link className="hover:underline" href="/test/state/recoil">
            <MenubarItem>Recoil</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
