import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <section className="">
      <div className="flex flex-col gap-4">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/products">Products</Link>
      </div>
    </section>
  );
}



