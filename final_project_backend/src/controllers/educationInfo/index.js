import educationalinformationModel from '../../models/educationInfo/index.js';

const educationinformationController = {
  createEducationInfo: async (req, res) => {
    try {
      const {
        institutionName,
        startingDate,
        completeDate,
        grade,
        degree,
        userId,
      } = req.body;

      const newEducationInfo = await educationalinformationModel.create({
        institutionName,
        startingDate,
        completeDate,
        grade,
        degree,
        userId,
      });

      return res.status(201).json({
        message: 'Educational information created successfully',
        educationInfo: newEducationInfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating educational information',
        error: error.message,
      });
    }
  },

  getAllEducationInfo: async (req, res) => {
    try {
      const educationInfos = await educationalinformationModel.findAll();
      return res.status(200).json({ educationInfos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching educational information',
        error: error.message,
      });
    }
  },

  getAllEducationInfoByUserId: async (req, res) => {
    try {
      const {userId} = req.params;
      const educationInfos = await educationalinformationModel.findAll({
        where:{
          userId : userId
        }
      });
      return res.status(200).json({ educationInfos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching educational information',
        error: error.message,
      });
    }
  },

  getEducationInfoById: async (req, res) => {
    try {
      const { id } = req.params;
      const educationInfo = await educationalinformationModel.findOne({
        where: { id },
      });

      if (!educationInfo) {
        return res
          .status(404)
          .json({ message: 'Educational information not found' });
      }

      return res.status(200).json({ educationInfo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching educational information',
        error: error.message,
      });
    }
  },

  updateEducationInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        institutionName,
        startingDate,
        completeDate,
        grade,
        degree,
        userId,
      } = req.body;

      const educationInfo = await educationalinformationModel.findOne({
        where: { id },
      });

      if (!educationInfo) {
        return res
          .status(404)
          .json({ message: 'Educational information not found' });
      }

      educationInfo.institutionName =
        institutionName || educationInfo.institutionName;
      educationInfo.startingDate = startingDate || educationInfo.startingDate;
      educationInfo.completeDate = completeDate || educationInfo.completeDate;
      educationInfo.grade = grade || educationInfo.grade;
      educationInfo.degree = degree || educationInfo.degree;
      educationInfo.userId = userId || educationInfo.userId;

      await educationInfo.save();

      return res.status(200).json({
        message: 'Educational information updated successfully',
        educationInfo,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating educational information',
        error: error.message,
      });
    }
  },

  deleteEducationInfo: async (req, res) => {
    try {
      const { id } = req.params;
      const educationInfo = await educationalinformationModel.findOne({
        where: { id },
      });

      if (!educationInfo) {
        return res
          .status(404)
          .json({ message: 'Educational information not found' });
      }

      await educationInfo.destroy();

      return res
        .status(200)
        .json({ message: 'Educational information deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error deleting educational information',
        error: error.message,
      });
    }
  },
};

export default educationinformationController;
