import { Router } from 'express';
import emailController from '../../controllers/email/index.js';
import validateEmailCreation from '../../middleware/validators/email/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const emailRouter = Router();

emailRouter.use(authentication, authorization(['admin']), checkAdmin);

// get all emails
emailRouter.get('/:contactId', emailController.getEmails);

// create email
emailRouter.post('/', validateEmailCreation, emailController.createEmail);

export default emailRouter;
