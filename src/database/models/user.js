'use strict';
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
import sequelize from '../config/sequelize';

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: uuidv4,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'buyer',
  },
  gender: DataTypes.STRING,
  preferredLanguage: DataTypes.STRING, 
  preferredCurrency: DataTypes.STRING,
  userAddress: DataTypes.JSONB,
  phoneN: DataTypes.STRING,
  isBlock: DataTypes.BOOLEAN,
  refreshToken: DataTypes.STRING,
  refreshTokenExpired: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: 'https://res.cloudinary.com/dmosnjgob/image/upload/v1732370311/pngegg_zilpcj.png',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mustUpdatePassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastTimePasswordUpdated: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  expired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  provider: DataTypes.STRING,
  googleId: DataTypes.STRING,
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  // New fields added
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  preferredContactMethod: {
    type: DataTypes.STRING,
    defaultValue: 'email',
  },
  marketingPreferences: {
    type: DataTypes.JSONB,
  },
  accountStatus: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  lastLoginAt: {
    type: DataTypes.DATE,
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  socialLinks: {
    type: DataTypes.JSONB,
  },
  subscriptionType: {
    type: DataTypes.STRING,
    defaultValue: 'free',
  },
  loyaltyPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  preferredCategories: {
    type: DataTypes.JSONB,
  },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: true,
  paranoid: true, 
});

export default User;
