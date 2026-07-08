import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';
import { Hono } from "hono";
import { validate } from "../../../middleware/validate";
import { updateUserSchema } from './schema';

export const updateUserApp = new Hono()
  .patch('/:id',
    validate('json', updateUserSchema),
    async (c) => {
      const id = Number(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ error: 'Invalid user ID format' }, 400);
      }

      const parsedData = c.req.valid('json');
      let updatePayload: Partial<typeof users.$inferInsert> = {};

      // 1. Isolate the execution scope to let TypeScript safely narrow types
      switch (parsedData.type) {
        case 'NAME':
          updatePayload.name = parsedData.newName;
          break;

        case 'EMAIL':
          // TODO: In a production app, verify the email or check duplicates here
          updatePayload.email = parsedData.newEmail;
          break;

        case 'PHONE':
          // TODO: Verify OTP before allowing phone mutation
          updatePayload.phone = parsedData.newPhone;
          break;

        case 'PASSWORD': {
          // Enclosing inside {} keeps block-scoped variables separate
          updatePayload.password_hash = await Bun.password.hash(parsedData.newPassword)
          break;
        }

        default:
          return c.json({ error: 'Invalid type' }, 400);
      }

      // 2. Perform safe update operation
      const updatedUser = await updateUser(id, updatePayload);

      if (!updatedUser) {
        return c.json({ error: 'User not found' }, 404);
      }

      return c.json({ data: updatedUser });
    });

async function updateUser(id: number, payload: Partial<typeof users.$inferInsert>) {
  if (Object.keys(payload).length === 0) return null;

  const result = await db
    .update(users)
    .set(payload)
    .where(eq(users.id, id))
    .returning({ id: users.id });

  return result[0] ?? null;
}
