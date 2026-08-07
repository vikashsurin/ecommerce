"use client";

import { apiClient } from "@/lib";

export default function TestPage() {
  async function handleClick() {
    console.log("calling client");
    const res = await apiClient.api.demo.$get();
    if (!res.ok) {
      throw new Error("There was an error");
    }

    const data = await res.json();
    console.log("Demo endpoint response:", data);
  }
  return (
    <>
      <div>
        <h1>Test Page</h1>

        <button onClick={handleClick} className="hover border">
          Click me
        </button>
      </div>
    </>
  );
}
