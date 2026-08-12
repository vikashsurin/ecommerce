"use client";

import { useSession } from "@/hooks/useSession";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import Link from "next/link";
import LoginButton from "./login-btn";

export default function HeaderAdmin() {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <header className=" flex px-4 items-center justify-between bg-gray-100">
      <div data-left>
        <NavLink href={"/admin"}>Home</NavLink>
        <NavLink href={"/about"}>About</NavLink>
        <NavLink href={"/dashboard"}>Dashboard</NavLink>
      </div>
      <div data-right className="flex items-center gap-4">
        <div className=" relative flex gap-2">
          {!session && <LoginButton />}
          <Menu />
        </div>
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

function MenuItemx({ href }: { href: string }) {
  return (
    <li>
      <Link href={href} className="px-2 underline">Account</Link>
    </li>
  );
}
