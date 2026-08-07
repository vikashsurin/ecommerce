import { factory } from '../../lib';
import { deleteAddressApp } from './delete-address/handler';
import { getAddressApp } from './get-address/handler';
import { listAddressApp } from './list-address/handler';
import { saveAddressApp } from './save-address/handler';
import { updateAddressApp } from './update-address/handler';

export const addressApp = factory.createApp()
  .route('/', saveAddressApp)
  .route('/', listAddressApp)
  .route('/', updateAddressApp)
  .route('/', deleteAddressApp)
  .route("/", getAddressApp)
