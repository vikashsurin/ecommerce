import { Hono } from "hono";
import { createCheckOut } from './create/handler';
import { getCheckoutSession } from './get/handler';
import { verifyRazorpayApp } from './verify/handler';

export const checkoutApp = new Hono()
  .route('/', createCheckOut)
  .route('/', getCheckoutSession)
  .route('/', verifyRazorpayApp)
