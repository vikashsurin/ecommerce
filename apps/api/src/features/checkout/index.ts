import { Hono } from "hono";
import { createCheckOut } from './create/handler';
import { getRazorpayOrderApp } from './get/handler';
import { verifyRazorpayApp } from './verify/handler';

export const checkoutApp = new Hono()
  .route('/', createCheckOut)
  .route('/', getRazorpayOrderApp)
  .route('/', verifyRazorpayApp)
