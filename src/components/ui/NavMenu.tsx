import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@cn/menubar'
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
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
