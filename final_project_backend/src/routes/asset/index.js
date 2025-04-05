import { Router } from 'express';
import assetController from '../../controllers/asset/index.js';
import authentication from '../../middleware/auth/index.js';
import authorization from '../../middleware/auth/userAuthorization.js';

const assetRouter = Router();

assetRouter.post('/', assetController.createAsset);

assetRouter.get(
  '/assets',
  // authentication,
  // authorization(['ITAdmin']),
  assetController.getAllAssets
);

assetRouter.get('/:id', assetController.getAssetById); 

assetRouter.get(
  '/assets/user/:id',
  // authentication,
  // authorization(['employee']),
  assetController.getAllAssetsByUserId
);

assetRouter.put('/:id', assetController.updateAsset);

assetRouter.delete('/:id', assetController.deleteAsset);

export default assetRouter;
