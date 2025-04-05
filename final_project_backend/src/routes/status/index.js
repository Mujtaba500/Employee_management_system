import { Router } from 'express';
import statusController from '../../controllers/status/index.js';
import statusValidator from '../../middleware/validators/status/index.js';
const statusRouter = Router();

// get all statuss
statusRouter.get('/', statusController.getAllStatus);

// get single status
statusRouter.get('/:id', statusController.getSingleStatus);

// create status
statusRouter.post(
  '/',
  statusValidator.validator,
  statusController.createStatus
);

// update status
statusRouter.put(
  '/:id',
  statusValidator.validator,
  statusController.updateStatus
);

// delete status
statusRouter.delete('/:id', statusController.deleteStatus);

export default statusRouter;
