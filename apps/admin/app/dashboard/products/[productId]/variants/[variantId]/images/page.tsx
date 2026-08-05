"use client";

import { useParams } from "next/navigation";

export default function() {
  const { variantId } = useParams();
  console.log({ variantId });
  return (
    <div>
      <div>
        <h1>Update Images</h1>
      </div>
    </div>
  );
}
