import { Hono } from 'hono'
import { deleteSession } from '../../sessions'
import { authMiddleware } from '../../../middleware'

export const logoutUserApp = new Hono()
  .post('/logout', authMiddleware, async (c) => {
    const authHeader = c.req.header('Authorization')

    // 1. Strict Bearer format validation
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        error: {
          code: 'invalid_request',
          message: 'Missing or malformed Authorization header'
        }
      }, 401)
    }

    const token = authHeader.substring(7) // Extract the token efficiently

    try {
      const session = await deleteSession(token)

      // 2. Clearer error handling for missing/invalid sessions
      if (!session) {
        return c.json({
          error: {
            code: 'unauthorized',
            message: 'Session is invalid or has already expired'
          }
        }, 401) // 401 makes more sense than 404 for auth-related failures
      }

      return c.json({ message: 'Logged out successfully' })

    } catch (error) {
      // 3. Catch unexpected database/network errors safely
      console.error('Logout error:', error) // Log internally for debugging

      return c.json({
        error: {
          code: 'internal_error',
          message: 'An unexpected error occurred during logout'
        }
      }, 500)
    }
  })
