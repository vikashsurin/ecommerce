import { Button } from "@workspace/ui/components/button";

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
