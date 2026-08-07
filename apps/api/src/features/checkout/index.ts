import { factory } from "../../lib";
import { createRazorpayOrderApp } from './create-order/handler';
import { getCheckoutSessionApp } from './get/handler';
import { checkoutSessionApp } from './session/handler';
import { verifyRazorpayApp } from './verify/handler';

export const checkoutApp = factory.createApp()
  .route('/', checkoutSessionApp)
  .route('/', getCheckoutSessionApp)
  .route('/', createRazorpayOrderApp)
  .route('/', verifyRazorpayApp)
