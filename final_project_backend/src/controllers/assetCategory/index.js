import assetCategoryModel from '../../models/assetCategory/index.js';

const assetCategoryController = {
  createAssetCategory: async (req, res) => {
    try {
      const { type } = req.body;

      const newAssetCategory = await assetCategoryModel.create({ type });

      return res.status(201).json({
        message: 'Asset category created successfully',
        assetCategory: newAssetCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating asset category',
        error: error.message,
      });
    }
  },

  getAllAssetCategories: async (req, res) => {
    try {
      const assetCategories = await assetCategoryModel.findAll();
      return res.status(200).json({ assetCategories });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching asset categories',
        error: error.message,
      });
    }
  },

  getAssetCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const assetCategory = await assetCategoryModel.findOne({
        where: { id },
      });

      if (!assetCategory) {
        return res
          .status(404)
          .json({ message: 'Asset category not found' });
      }

      return res.status(200).json({ assetCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching asset category',
        error: error.message,
      });
    }
  },

  updateAssetCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.body;

      const assetCategory = await assetCategoryModel.findOne({
        where: { id },
      });

      if (!assetCategory) {
        return res
          .status(404)
          .json({ message: 'Asset category not found' });
      }

      assetCategory.type = type || assetCategory.type;

      await assetCategory.save();

      return res.status(200).json({
        message: 'Asset category updated successfully',
        assetCategory,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating asset category',
        error: error.message,
      });
    }
  },

  deleteAssetCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const assetCategory = await assetCategoryModel.findOne({
        where: { id },
      });

      if (!assetCategory) {
        return res
          .status(404)
          .json({ message: 'Asset category not found' });
      }

      await assetCategory.destroy();

      return res
        .status(200)
        .json({ message: 'Asset category deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error deleting asset category',
        error: error.message,
      });
    }
  },
};

export default assetCategoryController;
