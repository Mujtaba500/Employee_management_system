import { Router } from 'express';
import getOwners from '../../controllers/owner/index.js';

const ownerRouter = Router();

ownerRouter.get('/', getOwners);

export default ownerRouter;
