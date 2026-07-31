"use client";

import CreateOrUpdateAddressForm from "@/app/features/address/components/create-or-update-address-form";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function EditAddressPage() {
  const params = useParams<{ addressId: string }>();
  const router = useRouter();
  return (
    <section className="m-8">
      <Link href="/account/address" className="flex items-center">
        <Button variant="secondary">
          <IconArrowLeft /> Back
        </Button>
      </Link>
      <div>
        <h1>Edit Address Page</h1>
      </div>
      <CreateOrUpdateAddressForm
        addressId={params?.addressId}
        isUpdate
        callbackAction={() => router.push("/account/address")}
      />
    </section>
  );
}
