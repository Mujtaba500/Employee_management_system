import experienceInfoModel from '../../models/experienceInfo/index.js';

const experienceInfoController = {
  createExperienceInfo: async (req, res) => {
    try {
      const {
        CompanyName,
        startingDate,
        completeDate,
        jobPosition,
        location,
        userId,
      } = req.body;

      const newExperienceInfo = await experienceInfoModel.create({
        CompanyName,
        startingDate,
        completeDate,
        jobPosition,
        location,
        userId,
      });

      return res.status(201).json({
        message: 'Experience information created successfully',
        experienceInfo: newExperienceInfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating experience information',
        error: error.message,
      });
    }
  },

  getAllExperienceInfo: async (req, res) => {
    try {
      const experienceInfos = await experienceInfoModel.findAll();
      return res.status(200).json({ experienceInfos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching experience information',
        error: error.message,
      });
    }
  },


  getAllExperienceInfoByUserId: async (req, res) => {
    try {
      const {userId} = req.params;
      const experienceInfos = await experienceInfoModel.findAll({
        where: {
          userId : userId
        }
      });
      return res.status(200).json({ experienceInfos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching experience information',
        error: error.message,
      });
    }
  },

  getExperienceInfoById: async (req, res) => {
    try {
      const { id } = req.params;
      const experienceInfo = await experienceInfoModel.findOne({
        where: { id },
      });

      if (!experienceInfo) {
        return res
          .status(404)
          .json({ message: 'Experience information not found' });
      }

      return res.status(200).json({ experienceInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching experience information',
        error: error.message,
      });
    }
  },

  updateExperienceInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        CompanyName,
        startingDate,
        completeDate,
        jobPosition,
        location,
        userId,
      } = req.body;

      const experienceInfo = await experienceInfoModel.findOne({
        where: { id },
      });

      if (!experienceInfo) {
        return res
          .status(404)
          .json({ message: 'Experience information not found' });
      }

      experienceInfo.CompanyName = CompanyName || experienceInfo.CompanyName;
      experienceInfo.startingDate = startingDate || experienceInfo.startingDate;
      experienceInfo.completeDate = completeDate || experienceInfo.completeDate;
      experienceInfo.jobPosition = jobPosition || experienceInfo.jobPosition;
      experienceInfo.location = location || experienceInfo.location;
      experienceInfo.userId = userId || experienceInfo.userId;

      await experienceInfo.save();

      return res.status(200).json({
        message: 'Experience information updated successfully',
        experienceInfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating experience information',
        error: error.message,
      });
    }
  },

  deleteExperienceInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const experienceInfo = await experienceInfoModel.findOne({
        where: { id },
      });

      if (!experienceInfo) {
        return res
          .status(404)
          .json({ message: 'Experience information not found' });
      }

      await experienceInfo.destroy();

      return res
        .status(200)
        .json({ message: 'Experience information deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error deleting experience information',
        error: error.message,
      });
    }
  },
};

export default experienceInfoController;
