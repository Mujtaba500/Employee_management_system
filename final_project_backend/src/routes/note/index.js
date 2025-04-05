import { Router } from 'express';
import noteController from '../../controllers/note/index.js';
import noteValidator from '../../middleware/validators/note/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';
import checkAdmin from '../../middleware/auth/checkAdmin.js';

const noteRouter = Router();

noteRouter.use(authentication, authorization(['admin']), checkAdmin);

// get all notes
noteRouter.get('/:contactId', noteController.getNotes);

// create note
noteRouter.post(
  '/:contactId',
  noteValidator.validateNote,
  noteController.createNote
);

noteRouter.post(
  '/comment/:noteId',
  noteValidator.validateComment,
  noteController.createComment
);

// update note
// noteRouter.put('/note/:id', noteValidator.validator, noteController.updateNote);

// // delete note
// noteRouter.delete('/note/:id', noteController.deleteNote);

export default noteRouter;
