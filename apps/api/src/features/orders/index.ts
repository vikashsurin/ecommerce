import { factory } from "../../lib";
import { getOrderDetailsHandler } from "./get-order-details/handler";
import { listOrdersHandler } from "./list-orders/handler";
import { cancelOrderHandler } from "./cancel-order/handler";

export const ordersApp = factory.createApp()
  .get("/", ...listOrdersHandler)
  .get("/:orderId", ...getOrderDetailsHandler)
  .patch("/:orderId", ...cancelOrderHandler)
