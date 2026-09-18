import { factory } from "../../lib"
import {
  authMiddleware,
  dbMiddleware,
  requireTokenMiddleware,
} from "../../middleware"
import { cancelOrderHandler } from "./cancel-order/handler"
import { getOrderDetailsHandler } from "./get-order-details/handler"
import { listOrdersHandler } from "./list-orders/handler"

export const ordersApp = factory
  .createApp()
  .use(requireTokenMiddleware)
  .use(dbMiddleware)
  .use(authMiddleware)
  .get("/", ...listOrdersHandler)
  .get("/:orderId", ...getOrderDetailsHandler)
  .patch("/:orderId", ...cancelOrderHandler)
