import { db, sessions } from '@repo/db';
import { hashToken } from '../_shared/hashToken';
import { type SessionCreatePayload } from './schema';

export const createSession = async (userId: number, ipAddress: string) => {
  const token = crypto.randomUUID()
  const tokenHash = hashToken(token)

  const payload = {
    userId: userId,
    tokenHash: tokenHash,
    ipAddress: ipAddress,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  }

  const session = await saveSession(payload)

  if (!session) {
    throw new Error('Failed to create session')
  }

  return { token }
}


async function saveSession(payload: SessionCreatePayload) {
  const session = await db
    .insert(sessions)
    .values(payload)
    .returning()

  return session[0] ?? null
}
