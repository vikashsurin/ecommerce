"use client";

import type { LucideIcon } from "lucide-react";
import { Boxes, LayoutDashboard, LayoutGrid, Package, Settings, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * ── Config ────────────────────────────────────────────────────────────
 * Add/remove/reorder nav items here — nothing else needs to change.
 * `href` is relative to "/admin". Omit `children` for a flat link.
 */
type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavChild[];
};

const NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "products",
    icon: Package,
    children: [
      { label: "Categories", href: "products/categories" },
      { label: "Inventory", href: "products/inventory" },
    ],
  },
  {
    label: "Orders",
    href: "orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    href: "customers",
    icon: Users,
  },
  {
    label: "Settings",
    href: "settings",
    icon: Settings,
  },
];

// ── Active-match helpers ────────────────────────────────────────────────
// Segment-aware, not substring-based — "/admin/products" won't false-match
// a route like "/admin/products-archive".
function toFullPath(href: string) {
  return "/admin/" + href;
}

function isActive(pathname: string, href: string, exact = false) {
  const full = toFullPath(href);
  return exact ? pathname === full : pathname === full || pathname.startsWith(full + "/");
}

// ── Components ───────────────────────────────────────────────────────────

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="flex w-56 flex-col gap-1  border-amber-800 bg-white py-3"
    >
      {NAV.map((item) => <NavGroup key={item.href} item={item} pathname={pathname} />)}
    </nav>
  );
}

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = !!item.children?.length;

  if (!hasChildren) {
    return (
      <SidebarLink
        href={item.href}
        label={item.label}
        icon={item.icon}
        pathname={pathname}
      />
    );
  }

  return (
    <div>
      {
        /* Parent: highlighted (bg) whenever inside the group, but only gets
          the border-y treatment when its own path is an exact match — not
          when a child route is what's actually active. */
      }
      <SidebarLink
        href={item.href}
        label={item.label}
        icon={item.icon}
        pathname={pathname}
        borderOnExactOnly
      />

      {item.children!.map((child) => (
        <SidebarLink
          key={child.href}
          href={child.href}
          label={child.label}
          pathname={pathname}
          indent
        />
      ))}
    </div>
  );
}

function SidebarLink({
  href,
  label,
  pathname,
  icon: Icon,
  indent = false,
  borderOnExactOnly = false,
}: {
  href: string;
  label: string;
  pathname: string;
  icon?: LucideIcon;
  indent?: boolean;
  /** Show border-y only when this link's own path is an exact match
   *  (used by group parents, so a child being active doesn't border them). */
  borderOnExactOnly?: boolean;
}) {
  // bg/font highlight: exact match for leaf links, "within group" match for parents
  const active = isActive(pathname, href, !borderOnExactOnly ? indent : false);
  // border-y: leaf links get it whenever active; parents only on exact match
  const showBorder = indent ? active : isActive(pathname, href, true);

  return (
    <Link
      href={toFullPath(href)}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 px-2 py-1 outline-amber-500 hover:outline-2 hover:z-99 ${
        indent ? "ml-4 border-l border-amber-800" : ""
      } ${active ? "bg-amber-200 text-amber-900 font-semibold" : ""} ${showBorder ? "border-y border-amber-800" : ""}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
      <span>{label}</span>
    </Link>
  );
}
