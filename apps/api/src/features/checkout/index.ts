import { factory } from "../../lib";
import { createRazorpayOrderHandler } from './create-order/handler';
import { getCheckoutSessionHandler, listCheckoutSessionsHandler } from './get/handler';
import { addCheckoutAddressHandler, addCheckoutItemsHandler, finalizeCheckoutHandler } from './session/handler';
import { verifyRazorpayHandler } from './verify/handler';

export const checkoutApp = factory.createApp()
  .post('/add-items', ...addCheckoutItemsHandler)
  .post('/add-address', ...addCheckoutAddressHandler)
  .post('/finalize', ...finalizeCheckoutHandler)
  .get('/:id', ...getCheckoutSessionHandler)
  .get('/', ...listCheckoutSessionsHandler)
  .post('/create-order', ...createRazorpayOrderHandler)
  .post('/verify-payment', ...verifyRazorpayHandler)
