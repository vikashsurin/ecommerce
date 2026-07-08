import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';

export async function getUserService(id: number) {

  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role
    })
    .from(users)
    .where(eq(users.id, id))

  return user[0] || null;
}
