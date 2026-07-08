import { Hono } from "hono";
import { validate } from "../../../middleware/validate";
import { createUserSchema, createUserService } from "../../users";

export const registerUserApp = new Hono()
  .post('/register', validate('json', createUserSchema), async (c) => {

    const parsedData = c.req.valid('json')
    try {
      const user = await createUserService(parsedData)

      return c.json({ data: user }, 201)
    } catch (error: any) {
      if (error?.cause?.errno === '23505')
        return c.json({
          error: {
            code: 'email_already_exists',
            message: "Email already exists"
          }
        }, 400)

      return c.json({
        error: {
          message: "Failed to create user"
        }
      }, 500)
    }
  });
