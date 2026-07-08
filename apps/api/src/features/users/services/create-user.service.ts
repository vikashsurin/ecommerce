import { db, users } from '@repo/db';
import { z } from "zod";
import { createUserSchema } from '../create-user/schema';

export async function createUserService(data: z.infer<typeof createUserSchema>) {

  const passwordHash = await Bun.password.hash(data.password)

  const user = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      phone: data.phone,
      role: data.role,
    })
    .returning({
      name: users.name,
      email: users.email,
      phone: users.phone,
      role: users.role
    })

  return user[0] || null;
}
