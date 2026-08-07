import { factory } from "../../lib";
import { getOrderDetailsApp } from "./get-order-details/handler";
import { listOrdersApp } from "./list-orders/handler";
import { cancelOrderApp } from "./cancel-order/handler";

export const ordersApp = factory.createApp()
  .route("/", listOrdersApp)
  .route("/", getOrderDetailsApp)
  .route("/", cancelOrderApp)
