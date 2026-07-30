import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="m-8">
      <h1>AccountPage</h1>
      <div className="flex gap-2 items-center">
        <Link href="/account/address" className="flex gap-2 items-center border px-2 py-1 rounded">
          Address <IconArrowRight />
        </Link>

        <Link href="account/order-history" className=" flex gap-2  items-center border px-2 py-1 rounded">
          Order History
          <IconArrowRight />
        </Link>
      </div>
    </div>
  );
}
