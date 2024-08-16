'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      subject:Sequelize.STRING,
      message:Sequelize.JSONB,
      entityId:Sequelize.JSONB,
      receiver:Sequelize.STRING,  
      receiverId:{
        type:Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      }, 
     is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};