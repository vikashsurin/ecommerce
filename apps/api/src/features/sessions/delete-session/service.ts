import { db, sessions } from "@repo/db"
import { hashToken } from "../_shared/hashToken"
import { eq } from "drizzle-orm"

export const deleteSession = async (token: string) => {
  const session = await findAndDeleteSession(token)
  return session
}

async function findAndDeleteSession(token: string) {
  const hash = hashToken(token)

  const session = await db
    .delete(sessions)
    .where(eq(sessions.tokenHash, hash))
    .returning()

  return session[0] ?? null
}
