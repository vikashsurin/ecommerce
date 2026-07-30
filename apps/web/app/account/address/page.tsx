"use client";

import { getAddresses } from "@/app/features/address/api";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";

export default function AddressPage() {
  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      return await getAddresses();
    },
  });

  return (
    <section>
      <h1>Address Page</h1>
      <div className="flex gap-4">
        <div
          onClick={() => {
            console.log('hello there');
          }}
          className="border w-xs items-center flex justify-center p-4 "
        >
          <IconPlus /> Add New Address
        </div>
        {addresses
          && addresses.map((address) => (
            <div key={address.id} className="p-4 border rounded-lg w-xs">
              <div className="flex gap-2 justify-between">
                <p className="font-bold">{address.type}</p>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
              <div className="text-sm">
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.zip}</p>
                <p>{address.country}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
