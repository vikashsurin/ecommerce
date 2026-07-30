import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { getAddresses } from "./features/address/api";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <Button variant="destructive" className="px-12">
        Click me
      </Button>

      <div>
        <LinkButton />
      </div>
    </div>
  );
}

function LinkButton() {
  return (
    <div>
    </div>
  );
}
