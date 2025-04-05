import { Router } from 'express';
import contactController from '../../controllers/contact/index.js';
import contactValidator from '../../middleware/validators/contact/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const contactRouter = Router();

contactRouter.use(authentication, authorization(['admin']), checkAdmin);

contactRouter.post(
  '/',
  contactValidator.validateContactCreation,
  contactController.createContact
);

contactRouter.get('/', contactController.getAllContacts);

contactRouter.get('/:id', contactController.getSingleContact);

contactRouter.put(
  '/:id',
  contactValidator.validateContactUpdation,
  contactController.updateContact
);

contactRouter.put('/view/:id', contactController.viewContact);

contactRouter.delete('/:id', contactController.deleteContact);

export default contactRouter;
