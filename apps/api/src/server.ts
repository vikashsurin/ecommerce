import mainApp from "./index"

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

console.log(`🚀 API Server running on http://localhost:${port}/api`)

// Initialize the native Bun high-performance server
Bun.serve({
  port: port,
  fetch: mainApp.fetch, // Hono handles the incoming Bun request stream directly!
})
