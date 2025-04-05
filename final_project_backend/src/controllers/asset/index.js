import assetModel from '../../models/asset/index.js';

const assetController = {
  createAsset: async (req, res) => {
    try {
      const {
        name,
        categoryId,
        departmentId,
        statusId,
        serialNumber,
        allocatedTo,
        cost,
      } = req.body;

      const newAsset = await assetModel.create({
        name,
        categoryId,
        departmentId,
        statusId,
        serialNumber,
        allocatedTo,
        cost,
      });

      return res.status(201).json({
        message: 'Asset created successfully',
        asset: newAsset,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error creating asset', error: error.message });
    }
  },

  getAllAssets: async (req, res) => {
    try {
      const assets = await assetModel.findAll();
      return res.status(200).json({ assets });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error fetching assets', error: error.message });
    }
  },
  getAllAssetsByUserId: async (req, res) => {
    try {
      const { id } = req.params
      console.log(`id of user: ${id}`);
      console.log(`request of user ${req.params}`)
      const assets = await assetModel.findAll({
        where: {
          allocatedTo: id,
        },
      });
      return res.status(200).json({ assets });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error fetching assets', error: error.message });
    }
  },

  getAssetById: async (req, res) => {
    try {
      const { id } = req.params;
      const asset = await assetModel.findOne({ where: { id } });

      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      return res.status(200).json({ asset });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error fetching asset', error: error.message });
    }
  },

  updateAsset: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        categoryId,
        departmentId,
        statusId,
        serialNumber,
        allocatedTo,
        cost,
      } = req.body;

      const asset = await assetModel.findOne({ where: { id } });

      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      asset.name = name || asset.name;
      asset.categoryId = categoryId || asset.categoryId;
      asset.departmentId = departmentId || asset.departmentId;
      asset.statusId = statusId || asset.statusId;
      asset.serialNumber = serialNumber || asset.serialNumber;
      asset.allocatedTo = allocatedTo || asset.allocatedTo;
      asset.cost = cost || asset.cost;

      await asset.save();

      return res.status(200).json({
        message: 'Asset updated successfully',
        asset,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error updating asset', error: error.message });
    }
  },

  deleteAsset: async (req, res) => {
    try {
      const { id } = req.params;
      const asset = await assetModel.findOne({ where: { id } });

      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      await asset.destroy();

      return res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error deleting asset', error: error.message });
    }
  },
};

export default assetController;
