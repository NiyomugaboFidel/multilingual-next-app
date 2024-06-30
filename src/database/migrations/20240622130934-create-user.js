const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:UUIDV4
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      role:{
        type:Sequelize.STRING,
        defaultValue:'buyer'
       },
       gender:Sequelize.STRING,
       prefferedLanguage:Sequelize.STRING,
       prefferedCurrency:Sequelize.STRING,
       userAddress:Sequelize.JSONB,
       phoneN:Sequelize.STRING,
       isBlock:Sequelize.BOOLEAN,
       refreshToken:Sequelize.STRING,
       refreshTokenExpired:{
        type:Sequelize.DATE,
        defaultValue:Date.now()
       },
       profilePic:{
        type:Sequelize.STRING,
        defaultValue:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='

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
      lastTimePasswordUpdated:{
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      expired:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
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