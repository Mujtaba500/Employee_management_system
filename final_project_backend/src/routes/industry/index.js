import { Router } from 'express';
import getindustries from '../../controllers/industry/index.js';

const industryRouter = Router();

industryRouter.get('/', getindustries);

export default industryRouter;
