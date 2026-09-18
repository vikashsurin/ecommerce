import { sessions } from "@repo/db"
import { hashToken } from "../_shared/hashToken"
import { eq } from "drizzle-orm"

export const deleteSession = async (db: any, token: string) => {
  const session = await findAndDeleteSession(db, token)
  return session
}

async function findAndDeleteSession(db: any, token: string) {
  const hash = await hashToken(token)

  const session = await db
    .delete(sessions)
    .where(eq(sessions.tokenHash, hash))
    .returning()

  return session[0] ?? null
}
