
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function ReviewOrderPage() {
  return (
    <div>
      <h2>Review Order</h2>
      <div>
        <ul>
          <li>address</li>
          <li>payment method</li>
          <li>order items + total</li>
        </ul>
      </div>
      <Link href="/checkout/">
        <Button>Place Order</Button>
      </Link>
    </div>
  )
}
