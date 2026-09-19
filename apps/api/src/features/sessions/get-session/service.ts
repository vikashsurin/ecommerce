import { sessions } from "@repo/db"
import { eq } from "drizzle-orm"
import { hashToken } from "../_shared/hashToken"

export const getSession = async (db: any, token: string) => {
  const tokenHash = await hashToken(token)

  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1)
  return session[0] ?? null
}
