import familyMemberModel from '../../models/familyMember/index.js';

const familyMemberController = {
  createFamilyMember: async (req, res) => {
    try {
      const { name, relationship, phoneNumber, isEmergency, userId } = req.body;

      const newFamilyMember = await familyMemberModel.create({
        name,
        relationship,
        phoneNumber,
        isEmergency,
        userId,
      });

      return res.status(201).json({
        message: 'Family member created successfully',
        familyMember: newFamilyMember,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating family member',
        error: error.message,
      });
    }
  },

  getAllFamilyMembers: async (req, res) => {
    try {
      const familyMembers = await familyMemberModel.findAll();
      return res.status(200).json({ familyMembers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching family members',
        error: error.message,
      });
    }
  },

  getAllFamilyMembersByUserId: async (req, res) => {
    try {
      const {userId} = req.params;
      const familyMembers = await familyMemberModel.findAll({
        where: {
          userId:userId
        }
      });
      return res.status(200).json({ familyMembers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching family members',
        error: error.message,
      });
    }
  },

  getFamilyMemberById: async (req, res) => {
    try {
      const { id } = req.params;
      const familyMember = await familyMemberModel.findOne({
        where: { id },
      });

      if (!familyMember) {
        return res.status(404).json({ message: 'Family member not found' });
      }

      return res.status(200).json({ familyMember });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error fetching family member',
        error: error.message,
      });
    }
  },

  updateFamilyMember: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, relationship, phoneNumber, isEmergency, userId } = req.body;

      const familyMember = await familyMemberModel.findOne({
        where: { id },
      });

      if (!familyMember) {
        return res.status(404).json({ message: 'Family member not found' });
      }

      familyMember.name = name || familyMember.name;
      familyMember.relationship = relationship || familyMember.relationship;
      familyMember.phoneNumber = phoneNumber || familyMember.phoneNumber;
      familyMember.isEmergency = isEmergency || familyMember.isEmergency;
      familyMember.userId = userId || familyMember.userId;

      await familyMember.save();

      return res.status(200).json({
        message: 'Family member updated successfully',
        familyMember,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating family member',
        error: error.message,
      });
    }
  },

  deleteFamilyMember: async (req, res) => {
    try {
      const { id } = req.params;
      const familyMember = await familyMemberModel.findOne({
        where: { id },
      });

      if (!familyMember) {
        return res.status(404).json({ message: 'Family member not found' });
      }

      await familyMember.destroy();

      return res
        .status(200)
        .json({ message: 'Family member deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error deleting family member',
        error: error.message,
      });
    }
  },
};

export default familyMemberController;
