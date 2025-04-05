import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/config.js';

const userModel = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 40],
          msg: 'Minimum length of name is 3 and maximum is 40',
        },
        notEmpty: { msg: 'name cannot be empty' },
        notNull: { msg: 'name cannot be null' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
        fields: [sequelize.fn('lower', sequelize.col('email'))],
      },
      validate: {
        len: {
          args: [3, 40],
          msg: 'Minimum length of email is 3 and maximum is 40',
        },
        notEmpty: { msg: 'email cannot be empty' },
        notNull: { msg: 'email cannot be null' },
        isEmail: {
          args: true,
          msg: 'email should be in this formate dumy@gmail.com',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: 'Minimum length of password is 8 and maximum is 255',
        },
        notEmpty: { msg: 'password cannot be empty' },
        notNull: { msg: 'password cannot be null' },
      },
    },
    userImg: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'contact cannot be empty' },
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: 'Minimum length of contact is 8 and maximum is 20',
        },
        notEmpty: { msg: 'contact cannot be empty' },
        notNull: { msg: 'contact cannot be null' },
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'start time cannot be empty' },
        notNull: { msg: 'start time cannot be null' },
      },
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'end time cannot be empty' },
        notNull: { msg: 'end time cannot be null' },
      },
    },
    servingHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'serving Hours cannot be empty' },
        notNull: { msg: 'serving Hours cannot be null' },
        isFloat: { msg: 'serving Hours must be float' },
      },
    },
    rating: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['1', '2', '3', '4', '5'],
      validate: {
        isIn: {
          args: [['1', '2', '3', '4', '5']],
          msg: 'Rating can only be 1,2,3,4,5',
        },
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'date of birth cannot be empty' },
        notNull: { msg: 'date of birth  cannot be null' },
        isDate: { msg: 'date of birth  must be date' },
      },
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['male', 'female', 'other'],
      validate: {
        notEmpty: { msg: 'gender cannot be empty' },
        notNull: { msg: 'gender cannot be null' },
        isIn: {
          args: [['male', 'female', 'other']],
          msg: 'gender must be male, female and other',
        },
      },
    },
    cnicNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [10, 30],
          msg: 'Minimum length of cnic number is 10 and maximum is 30',
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'address cannot be empty' },
        len: {
          args: [5, 255],
          msg: 'Minimum length of address number is 5 and maximum is 255',
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'country cannot be empty' },
        len: {
          args: [3, 25],
          msg: 'Minimum length of country number is 3 and maximum is 25',
        },
      },
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'department Id cannot be empty' },
        notNull: { msg: 'department Id be null' },
      },
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'designation Id cannot be empty' },
        notNull: { msg: 'designation Id be null' },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'role Id cannot be empty' },
        notNull: { msg: 'role Id Id be null' },
      },
    },
    lineManagerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Reference the same table
        key: 'id',
      },
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

export default userModel;
