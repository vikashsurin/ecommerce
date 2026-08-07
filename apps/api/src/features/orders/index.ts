import { Hono } from "hono";
import { getOrderDetailsApp } from "./get-order-details/handler";
import { listOrdersApp } from "./list-orders/handler";
import { cancelOrderApp } from "./cancel-order/handler";

export const ordersApp = new Hono()
  .route("/", listOrdersApp)
  .route("/", getOrderDetailsApp)
  .route("/", cancelOrderApp)
