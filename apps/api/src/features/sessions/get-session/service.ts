import { db, sessions } from '@repo/db';
import { hashToken } from '../_shared/hashToken';
import { eq } from 'drizzle-orm';

export const getSession = async (token: string) => {
  const tokenHash = hashToken(token);

  const session = await db.select()
    .from(sessions)
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1);
  return session[0] ?? null;
};
