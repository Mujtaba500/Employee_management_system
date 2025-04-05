import { Router } from 'express';
import dealController from '../../controllers/deal/index.js';
import dealValidator from '../../middleware/validators/deal/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const dealRouter = Router();

dealRouter.use(authentication, authorization(['admin']), checkAdmin);

dealRouter.post('/', dealValidator.validateInput, dealController.createDeal);

dealRouter.get('/:id', dealController.getDeals);

// dealRouter.get('/deal', dealController.getAlldeals);

// dealRouter.get('/deal/:id', dealController.getSingledeal);

// dealRouter.put(
//   '/deal/:id',
//   dealValidator.validateInput,
//   dealController.updatedeal
// );

// dealRouter.put('/deal/view/:id', dealController.viewdeal);

// dealRouter.delete('/deal/:id', dealController.deletedeal);

export default dealRouter;
