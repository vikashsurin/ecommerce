"use client";

import { getAddresses } from "@/app/features/address/api";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import Link from "next/link";

export default function AddressPage() {
  const { data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      return await getAddresses();
    },
  });

  return (
    <section className="m-8">
      <h1>Address Page</h1>
      <div className="xs:grid-cols-1 mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-center">
            <Link
              href="/account/address/new"
              className="flex h-50 w-50 flex-col items-center justify-center"
            >
              <IconPlus /> Add New
            </Link>
          </CardContent>
        </Card>
        {addresses
          && addresses.map((address) => (
            <Card key={address.id} className="  ">
              <CardHeader>
                <div className="flex justify-between">
                  <p className="">{address.type}</p>
                  <Link
                    href={`/account/address/edit/${address.id}`}
                  >
                    <button className="text-xs font-semibold bg-gray-100 text-gray-700 px-1 py-0.5 rounded hover:bg-blue-200">
                      Edit
                    </button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.zip}</p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
