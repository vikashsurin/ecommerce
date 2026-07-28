import { Hono } from "hono";
import { createRazorpayOrderApp } from './create-order/handler';
import { getCheckoutSessionApp } from './get/handler';
import { checkoutSessionApp } from './session/handler';
import { verifyRazorpayApp } from './verify/handler';

export const checkoutApp = new Hono()
  .route('/', checkoutSessionApp)
  .route('/', getCheckoutSessionApp)
  .route('/', createRazorpayOrderApp)
  .route('/', verifyRazorpayApp)
