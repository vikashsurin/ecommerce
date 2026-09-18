import { neon } from "@neondatabase/serverless"

const url = "postgresql://vikashadmin:dbpass@123@localhost:5432/ecommerce"
const sql = neon(url)
const res = await sql`SELECT 1 as ok`
console.log(res)
