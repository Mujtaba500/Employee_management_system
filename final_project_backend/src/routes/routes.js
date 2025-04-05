import companyRouter from './company/index.js';
import contactRouter from './contact/index.js';
import assetRouter from './asset/index.js';
import userRouter from './user/index.js';
import roleRouter from './role/index.js';
import statusRouter from './status/index.js';
import departmentRouter from './department/index.js';
import designationRouter from './designation/index.js';
import leaveTypeRouter from './leaveType/index.js';
import attendanceRouter from './attendance/index.js';
import leaveRouter from './leave/index.js';
import workFromHomeRouter from './workFromHome/index.js';
import authRouter from './auth/index.js';
import ownerRouter from './owner/index.js';
import industryRouter from './industry/index.js';
import familyMemberRouter from './familyMember/index.js';
import assetCategoryRouter from './assetCategory/index.js';
import experienceInfoRouter from './experienceInfo/index.js';
import educationalinfoRouter from './educationInfo/index.js';
import dealRouter from './deal/index.js';
import noteRouter from './note/index.js';
import callRouter from './call/index.js';
import fileRouter from './file/index.js';
import emailRouter from './email/index.js';
import singleRouteController from '../controllers/single/index.js';
import upload from '../middleware/upload/index.js';
import authentication from '../middleware/auth/index.js';

import { Router } from 'express';

const allRoutes = Router();

allRoutes.use('/auth', authRouter);
allRoutes.use('/department', departmentRouter);
allRoutes.use('/designation', designationRouter);
allRoutes.use('/contact', contactRouter);
allRoutes.use('/deal', dealRouter);
allRoutes.use('/note', noteRouter);
allRoutes.use('/call', callRouter);
allRoutes.use('/file', fileRouter);
allRoutes.use('/email', emailRouter);
allRoutes.use('/company', companyRouter);
allRoutes.use('/owner', ownerRouter);
allRoutes.use('/industry', industryRouter);
allRoutes.use('/asset', assetRouter);
allRoutes.use('/user', userRouter);
allRoutes.use('/role', roleRouter);
allRoutes.use('/status', statusRouter);
allRoutes.use('/familyMember', familyMemberRouter);
allRoutes.use('/assetCategory', assetCategoryRouter);
allRoutes.use('/experienceInfo', experienceInfoRouter);
allRoutes.use('/eduInfo', educationalinfoRouter);
allRoutes.use('/attendance', attendanceRouter);
allRoutes.use('/leave', leaveRouter);
allRoutes.use('/workFromHome', workFromHomeRouter);
allRoutes.use('/leaveType', leaveTypeRouter);



//Single routes

// allRoutes.use(authentication);

allRoutes.get('/currency', singleRouteController.getCurrencies);

allRoutes.get('/source', singleRouteController.getSources);

allRoutes.get('/tag', singleRouteController.getTags);

allRoutes.get('/contact-status', singleRouteController.getContactStatuses);

allRoutes.get('/language', singleRouteController.getLanguages);

allRoutes.get('/review', singleRouteController.getReviews);

allRoutes.get('/country', singleRouteController.getCountries);

allRoutes.get('/pipeline', singleRouteController.getPipeLines);

allRoutes.get('/deal-status', singleRouteController.getDealStatuses);

allRoutes.get('/project', singleRouteController.getProjects);

allRoutes.get('/call-status', singleRouteController.getCallStatuses);

allRoutes.post(
  '/upload',
  upload.single('file'),
  singleRouteController.uploadFile
);

allRoutes.get('/locale', singleRouteController.getLocales);

allRoutes.get('/document-type', singleRouteController.getDocumentTypes);


// const allRoutes = [
//   companyRouter,
//   contactRouter,
//   userRouter,
//   roleRouter,
//   statusRouter,
//   assetRouter,
//   departmentRouter,
//   designationRouter,
//   familyMemberRouter,
//   assetCategoryRouter,
//   experienceInfoRouter,
//   educationalinfoRouter,
//   leaveTypeRouter,
// attendanceRouter,
//   leaveRouter,
//   workFromHomeRouter,
//   authRouter,
//   ownerRouter,
//   industryRouter,
//   allRoutes,
//   dealRouter,
//   noteRouter,
//   callRouter,
//   fileRouter,
//   emailRouter,
// ];

export default allRoutes;
