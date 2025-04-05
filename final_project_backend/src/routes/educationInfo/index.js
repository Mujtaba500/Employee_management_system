import { Router } from 'express';
import educationinformationController from '../../controllers/educationInfo/index.js';

const educationInfoRouter = Router();

educationInfoRouter.post(
  '/',
  educationinformationController.createEducationInfo
);

educationInfoRouter.get(
  '/',
  educationinformationController.getAllEducationInfo
);

educationInfoRouter.get(
  '/:id',
  educationinformationController.getEducationInfoById
);

educationInfoRouter.get(
  '/eduInfos/:userId',
  educationinformationController.getAllEducationInfoByUserId
);

educationInfoRouter.put(
  '/:id',
  educationinformationController.updateEducationInfo
);

educationInfoRouter.delete(
  '/:id',
  educationinformationController.deleteEducationInfo
);

export default educationInfoRouter;