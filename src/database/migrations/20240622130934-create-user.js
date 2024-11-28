'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'buyer',
      },
      gender: Sequelize.STRING,
      preferredLanguage: Sequelize.STRING, 
      preferredCurrency: Sequelize.STRING,
      userAddress: Sequelize.JSONB,
      phoneN: Sequelize.STRING,
      isBlock: Sequelize.BOOLEAN,
      refreshToken: Sequelize.STRING,
      refreshTokenExpired: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      profilePic: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/dmosnjgob/image/upload/v1732370311/pngegg_zilpcj.png',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mustUpdatePassword: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      lastTimePasswordUpdated: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      expired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      provider: Sequelize.STRING,
      googleId: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      preferredContactMethod: {
        type: Sequelize.STRING,
        defaultValue: 'email',
      },
      marketingPreferences: {
        type: Sequelize.JSONB,
      },
      accountStatus: {
        type: Sequelize.STRING,
        defaultValue: 'active',
      },
      lastLoginAt: {
        type: Sequelize.DATE,
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      socialLinks: {
        type: Sequelize.JSONB,
      },
      subscriptionType: {
        type: Sequelize.STRING,
        defaultValue: 'free',
      },
      loyaltyPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      preferredCategories: {
        type: Sequelize.JSONB,
      },
      termsAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};