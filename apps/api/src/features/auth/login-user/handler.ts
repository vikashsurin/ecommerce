import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { getConnInfo } from 'hono/bun';
import { setCookie } from 'hono/cookie';
import { validate } from '../../../middleware/validate';
import { createSession } from '../../sessions';
import { loginUserSchema } from './schema';

export const loginUserApp = new Hono()
  .post('/login',
    validate("json", loginUserSchema),
    async (c) => {
      console.log('req', c.req)
      const { email, password } = c.req.valid('json')
      const info = getConnInfo(c)
      const ipAddress = info.remote.address

      try {
        const user = await findUser(email, password)

        if (user && ipAddress) {
          const { token } = await createSession(user.id, ipAddress)

          setCookie(c, '_Host_session', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/',
            maxAge: 30 * 60 * 60,
          })

          return c.json({ data: { user, token } })
        }
        return c.json(user)
      } catch (error) {
        return c.json({
          error: {
            code: "LOGIN_ERROR",
            message: error instanceof Error ? error.message : String(error),
          }
        }, 400)
      }
    })

async function findUser(email: string, password: string) {

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await Bun.password.verify(password, user.password_hash)

  if (!isMatch) {
    throw new Error('Invalid password')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
