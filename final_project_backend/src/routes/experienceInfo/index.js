import { Router } from 'express';
import experienceInfoController from '../../controllers/experienceInfo/index.js';

const experienceInfoRouter = Router();

experienceInfoRouter.post(
  '/',
  experienceInfoController.createExperienceInfo
);

experienceInfoRouter.get(
  '/experienceInfos',
  experienceInfoController.getAllExperienceInfo
);

experienceInfoRouter.get(
  '/experienceInfos/:userId',
  experienceInfoController.getAllExperienceInfoByUserId
);

experienceInfoRouter.get(
  '/:id',
  experienceInfoController.getExperienceInfoById
);

experienceInfoRouter.put(
  '/:id',
  experienceInfoController.updateExperienceInfo
);

experienceInfoRouter.delete(
  '/:id',
  experienceInfoController.deleteExperienceInfo
);

export default experienceInfoRouter;
