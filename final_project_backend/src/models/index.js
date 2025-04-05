import userModel from './user/index.js';
import roleModel from './role/index.js';
import departmentModel from './department/index.js';
import designationModel from './designation/index.js';
import leaveTypeModel from './leaveType/index.js';
import leavesModel from './leave/index.js';
import statusModel from './status/index.js';
import workFromHomeModel from './workFromHome/index.js';
import attendanceModel from './attendance/index.js';
import educationalinformationModel from './educationInfo/index.js';
import experienceInfoModel from './experienceInfo/index.js';
import familyMemberModel from './familyMember/index.js';
import assetModel from './asset/index.js';
import assetCategoryModel from './assetCategory/index.js';

// Define associations

// user and role
roleModel.hasMany(userModel, {
  foreignKey: { name: 'roleId', allowNull: false },
});
userModel.belongsTo(roleModel, {
  foreignKey: { name: 'roleId', allowNull: false },
});

// department and user
departmentModel.hasMany(userModel, {
  foreignKey: { name: 'departmentId', allowNull: false },
});
userModel.belongsTo(departmentModel, {
  foreignKey: { name: 'departmentId', allowNull: false },
});

// designation and user
designationModel.hasMany(userModel, {
  foreignKey: { name: 'designationId', allowNull: false },
});
userModel.belongsTo(designationModel, {
  foreignKey: { name: 'designationId', allowNull: false },
});

// leave and user
userModel.hasMany(leavesModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});
leavesModel.belongsTo(userModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});

// leave and leave type
leaveTypeModel.hasMany(leavesModel, {
  foreignKey: { name: 'leaveTypeId', allowNull: false },
  onDelete: 'cascade',
});
leavesModel.belongsTo(leaveTypeModel, {
  foreignKey: { name: 'leaveTypeId', allowNull: false },
  onDelete: 'cascade',
});

// work from home and user
userModel.hasMany(workFromHomeModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});
workFromHomeModel.belongsTo(userModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});

// attendence and user
userModel.hasMany(attendanceModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});
attendanceModel.belongsTo(userModel, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'cascade',
});

// user and line manager. Self-referential associations
userModel.hasMany(userModel, {
  foreignKey: 'lineManagerId',
  as: 'managedEmployees',
});

userModel.belongsTo(userModel, {
  foreignKey: 'lineManagerId',
  as: 'lineManager',
});

// //user and asset
// userModel.hasMany(assetModel, {
//   foreignKey: { name: 'allocatedTo', allowNull: true },
// });
// assetModel.belongsTo(userModel, {
//   foreignKey: { name: 'allocatedTo', allowNull: true },
// });

// // asset category and asset
// assetCategoryModel.hasMany(assetModel, {
//   foreignKey: { name: 'categoryId', allowNull: false },
// });
// assetModel.belongsTo(assetCategoryModel, {
//   foreignKey: { name: 'categoryId', allowNull: false },
// });

// // asset and department
// departmentModel.hasMany(assetModel, {
//   foreignKey: { name: 'departmentId', allowNull: false },
// });
// assetModel.belongsTo(departmentModel, {
//   foreignKey: { name: 'departmentId', allowNull: false },
// });

// // asset and status
// statusModel.hasMany(assetModel, {
//   foreignKey: { name: 'statusId', allowNull: false },
// });
// assetModel.belongsTo(statusModel, {
//   foreignKey: { name: 'statusId', allowNull: false },
// });

// // user and educational information
// userModel.hasMany(educationalinformationModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });
// educationalinformationModel.belongsTo(userModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });

// // user and experience information
// userModel.hasMany(experienceInfoModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });
// experienceInfoModel.belongsTo(userModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });

// // user and family member
// userModel.hasMany(familyMemberModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });
// familyMemberModel.belongsTo(userModel, {
//   foreignKey: { name: 'userId', allowNull: false },
// });

export default {
  userModel,
  roleModel,
  departmentModel,
  designationModel,
  leaveTypeModel,
  leavesModel,
  statusModel,
  workFromHomeModel,
  attendanceModel,
  // assetModel,
  // assetCategoryModel,
  // educationalinformationModel,
  // experienceInfoModel,
  // familyMemberModel,
};
