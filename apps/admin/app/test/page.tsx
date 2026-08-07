"use client"

import { apiClient } from "@/lib"

export default function TestPage() {
  async function handleClick() {
    const res = await apiClient.api.demo.test[":id"].$get({
      param: { id: "123" },
    })
    if (!res.ok) {  
      console.error("Error fetching demo endpoint:", res.statusText)
      return
    }
    const data = await res.json()
    console.log("Demo endpoint response:", data)
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
  )
}
