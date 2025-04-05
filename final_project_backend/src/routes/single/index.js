import { Router } from 'express';
import singleRouteController from '../../controllers/single/index.js';
import upload from '../../middleware/upload/index.js';
import authentication from '../../middleware/auth/index.js';

const singleRouteRouter = Router();

singleRouteRouter.use(authentication);

singleRouteRouter.get('/currency', singleRouteController.getCurrencies);

singleRouteRouter.get('/source', singleRouteController.getSources);

singleRouteRouter.get('/tag', singleRouteController.getTags);

singleRouteRouter.get(
  '/contact-status',
  singleRouteController.getContactStatuses
);

singleRouteRouter.get('/language', singleRouteController.getLanguages);

singleRouteRouter.get('/review', singleRouteController.getReviews);

singleRouteRouter.get('/country', singleRouteController.getCountries);

singleRouteRouter.get('/pipeline', singleRouteController.getPipeLines);

singleRouteRouter.get('/deal-status', singleRouteController.getDealStatuses);

singleRouteRouter.get('/project', singleRouteController.getProjects);

singleRouteRouter.get('/call-status', singleRouteController.getCallStatuses);

singleRouteRouter.post(
  '/upload',
  upload.single('file'),
  singleRouteController.uploadFile
);

singleRouteRouter.get('/locale', singleRouteController.getLocales);

singleRouteRouter.get('/document-type', singleRouteController.getDocumentTypes);

export default singleRouteRouter;
