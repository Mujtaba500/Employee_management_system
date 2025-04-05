import { Router } from 'express';
import familyMemberController from '../../controllers/familyMember/index.js';

const familyMemberRouter = Router();

familyMemberRouter.post(
  '/',
  familyMemberController.createFamilyMember
);

familyMemberRouter.get(
  '/familyMembers',
  familyMemberController.getAllFamilyMembers
);

familyMemberRouter.get(
  '/:id',
  familyMemberController.getFamilyMemberById
);

familyMemberRouter.get(
  '/familyMembers/:userId',
  familyMemberController.getAllFamilyMembersByUserId
);

familyMemberRouter.put(
  '/:id',
  familyMemberController.updateFamilyMember
);

familyMemberRouter.delete(
  '/:id',
  familyMemberController.deleteFamilyMember
);

export default familyMemberRouter;
