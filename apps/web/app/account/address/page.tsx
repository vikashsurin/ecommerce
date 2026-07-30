"use client";

import { getAddresses } from "@/app/features/address/api";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

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
      <div className="flex gap-4 mt-6">
        <div
          onClick={() => {
            console.log('hello there');
          }}
          className="p-4 flex flex-col text-gray-500 hover:text-blue-600 border-dashed items-center justify-center h-50 w-50 gap-2  border rounded-lg"
        >
          <IconPlus /> Add New
        </div>
        {addresses
          && addresses.map((address) => (
            <div key={address.id} className="p-4 flex flex-col  h-50 w-50 gap-2 border rounded-lg ">
              <div className="flex items-start justify-between  gap-2">
                <p className="font-semibold text-sm">{address.type}</p>
                <button className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-50 hover:text-blue-600  py-0.5 px-1 rounded-sm font-semibold">
                  Edit
                </button>
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
