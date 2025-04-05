import { Router } from 'express';
import fileController from '../../controllers/file/index.js';
import validatefileCreation from '../../middleware/validators/file/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const fileRouter = Router();

fileRouter.use(authentication, authorization(['admin']), checkAdmin);

// get all files
fileRouter.get('/:contactId', fileController.getFiles);

// create file
fileRouter.post('/:contactId', validatefileCreation, fileController.createFile);

// fileRouter.post(
//   '/file/comment/:fileId',
//   fileValidator.validateComment,
//   fileController.createComment
// );

// update file
// fileRouter.put('/file/:id', fileValidator.validator, fileController.updatefile);

// // delete file
// fileRouter.delete('/file/:id', fileController.deletefile);

export default fileRouter;
