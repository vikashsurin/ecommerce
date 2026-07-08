import { Hono } from "hono";
import { createOrderApp } from "./create-order/handler";
import { getOrderDetailsApp } from "./get-order-details/handler";
import { listOrdersApp } from "./list-orders/handler";
import { cancelOrderApp } from "./cancel-order/handler";

export const ordersApp = new Hono()
  .route("/", createOrderApp)
  .route("/", listOrdersApp)
  .route("/", getOrderDetailsApp)
  .route("/", cancelOrderApp)
