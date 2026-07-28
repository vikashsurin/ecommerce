import { Hono } from "hono";
import { createRazorpayOrderApp } from './create/order/handler';
import { checkoutSessionApp } from './create/session/handler';
import { getCheckoutSessionApp } from './get/handler';
import { syncCheckoutSession } from './services/sync-checkout-session';
import { verifyRazorpayApp } from './verify/handler';

export const checkoutApp = new Hono()
  .route('/', checkoutSessionApp)
  .route('/', getCheckoutSessionApp)
  .route('/', verifyRazorpayApp)
  .route('/', createRazorpayOrderApp)


export { syncCheckoutSession };
