import { Router } from 'express';
import assetCategoryController from '../../controllers/assetCategory/index.js';

const assetCategoryRouter = Router();

assetCategoryRouter.post(
  '/',
  assetCategoryController.createAssetCategory 
);

assetCategoryRouter.get(
  '/assetCategories',
  assetCategoryController.getAllAssetCategories
);

assetCategoryRouter.get(
  '/:id',
  assetCategoryController.getAssetCategoryById
);

assetCategoryRouter.put(
  '/:id',
  assetCategoryController.updateAssetCategory
);

assetCategoryRouter.delete(
  '/:id',
  assetCategoryController.deleteAssetCategory 
);

export default assetCategoryRouter;
