"use client";

import Cart from "@/components/Cart";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import Link from "next/link";
export default function Header() {
  return (
    <header className="Link-4 flex px-4 items-center justify-between bg-gray-100">
      <div data-left>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/about"}>About</NavLink>
        <NavLink href="/products">Products</NavLink>
      </div>

      <div data-right className="flex items-center gap-4">
        <div className="relative">
          <Menu />
        </div>

        <Cart />
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <button className="px-2 py-4">{children}</button>
    </Link>
  );
}

function Menu() {
  return (
    <Popover>
      <PopoverTrigger className={"font-semibold text-sm flex items-center gap-1"}>
        <span>Account</span>
        <IconCaretDownFilled size={16} />
      </PopoverTrigger>
      <PopoverContent className={"rounded mt-2  min-h-50"}>
        <ul>
          <MenuItemx href={"/account"} />
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function MenuItemx(href: string) {
  return (
    <li>
      <Link href={href} className="px-2 underline">Account</Link>
    </li>
  );
}
