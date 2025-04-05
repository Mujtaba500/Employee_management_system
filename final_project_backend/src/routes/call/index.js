import { Router } from 'express';
import callController from '../../controllers/call/index.js';
import validateCallCreation from '../../middleware/validators/call/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const callRouter = Router();

callRouter.use(authentication, authorization(['admin']), checkAdmin);

callRouter.post('/:contactId', validateCallCreation, callController.createCall);

callRouter.get('/:contactId', callController.getCalls);

callRouter.put('/:callId', callController.updateCallStatus);

export default callRouter;
