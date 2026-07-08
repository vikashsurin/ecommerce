import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { getSession } from "../features/sessions";
import { getUserService } from "../features/users";

const cookieName = Bun.env.COOKIE_NAME ?? null

export const authMiddleware = createMiddleware(async (c, next) => {

  // const token = _tokenFromHeader(c)

  const token = _tokenFromCookie(c)
  console.log('req', c.req)

  if (!token) {
    return c.json({
      error: {
        code: 'invalid_request',
        message: 'Missing or malformed Authorization'
      }
    }, 401);
  }

  const session = await getSession(token)

  if (!session) {
    return c.json({
      error: {
        code: 'invalid_request',
        message: 'Unauthorized'
      }
    }, 401);
  }

  const user = await getUserService(session.userId)

  c.set('user', user)

  await next()
});


function _tokenFromHeader(c: any) {
  const authHeader = c.req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)

  if (!token) {
    return null
  }

  return token
}


function _tokenFromCookie(c: any) {

  if (!cookieName) {
    console.error('COOKIE_NAME not set')
    return null
  }

  const token = getCookie(c, cookieName)

  if (!token) {
    return null
  }

  // delete cookie on unauthorized

  return token
}
