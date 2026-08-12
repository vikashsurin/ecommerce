import { deleteCookie } from "hono/cookie";
import { AppError, factory } from "../../../lib";
import { cookieFromContext } from "../../../lib/cookie-from-context";
import { env } from "../../../lib/env";
import { getSession } from "../../sessions";
import { getUserService } from "../../users";

export const meApp = factory.createApp().get("/me", async (c) => {
  const cookie = cookieFromContext(c);

  if (!cookie) {
    throw AppError.unauthorized("Not logged in");
  }

  const session = await getSession(cookie);

  if (!session) {
    deleteCookie(c, env.COOKIE_NAME);
    return c.json(
      {
        data: null,
      },
      200,
    );
  }

  try {
    const user = await getUserService(session.userId);

    return c.json({
      data: user,
    });
  } catch (error) {
    return c.json(
      {
        error: {
          code: "internal_server_error",
          message: "Internal Server Error",
        },
      },
      500,
    );
  }
});
