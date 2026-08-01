import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div>
      <Link href='/auth/login'>
        <Button variant={"default"} size={"xs"} className={" rounded-sm text-white"}>Login</Button>
      </Link>
    </div>
  );
}
