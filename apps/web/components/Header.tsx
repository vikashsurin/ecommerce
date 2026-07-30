'use client'

import Cart from "@/components/Cart"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import Link from "next/link"

export default function Header() {

  return (
    <header className="Link-4 flex items-center justify-between bg-amber-100">
      <div data-left>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/about"}>About</NavLink>
        <NavLink href="/products">Products</NavLink>
      </div>
      <div data-right className="flex items-center gap-2">
        <div className="relative">
          <Menu />
        </div>

        <Cart />
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href}>
      <button className="px-2 py-4">{children}</button>
    </Link>
  )
}

function Menu() {
  return (
    <Popover>
      <PopoverTrigger>Account</PopoverTrigger>
      <PopoverContent className={'rounded-none'}>
        <div>
          <ul>
            <Link href={'/account'}>Account</Link>
          </ul>
        </div>
      </PopoverContent>

    </Popover>
  )
}
