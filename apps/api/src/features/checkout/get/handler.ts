import z from "zod";
import { appFactory } from "../../../lib/factory";
import { authMiddleware, validate } from "../../../middleware";

export const getRazorpayOrderApp = appFactory()
  .get("/:sessionId/payment/get-order",
    authMiddleware,
    validate('param', z.object({
      sessionId: z.string(),
    })),
    async (c) => {
      const user = c.get("user");
      const { sessionId } = c.req.param();
      return c.json({ data: '' })
    });
