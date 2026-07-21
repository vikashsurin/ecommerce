import { Hono } from 'hono';
import { deleteAddressApp } from './delete-address/handler';
import { listAddressApp } from './list-address/handler';
import { saveAddressApp } from './save-address/handler';
import { updateAddressApp } from './update-address/handler';


export const addressApp = new Hono()
  .route('/', saveAddressApp)
  .route('/', listAddressApp)
  .route('/', updateAddressApp)
  .route('/', deleteAddressApp)
