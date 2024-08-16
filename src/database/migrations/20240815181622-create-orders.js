'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{model:'Users', key:'id'}
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: false, // Required field
      },
      paymentIntentId: {
        type: Sequelize.STRING,
        allowNull: true, // Optional
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.JSONB), // Array of objects in Sequelize (PostgreSQL specific)
        allowNull: false,
      },
      customer:{
        type:Sequelize.JSONB,
        allowNull:false,
      },
      delivery_status: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:'pending',
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      paymentIntentId:{
        type: Sequelize.STRING,
      },
      paymentInfo: {
        type: Sequelize.JSONB, // Corresponds to JSONB in PostgreSQL
        allowNull: true, // Optional
      },
      
      shipping: {
        type: Sequelize.JSONB, // Corresponds to JSONB in PostgreSQL
        allowNull: false, // Required field
      },
      phoneNumber: {
        type: Sequelize.STRING, // Corresponds to VARCHAR in PostgreSQL
        allowNull: true, // Optional
      },
     transportAmount: {
        type: Sequelize.INTEGER,
        allowNull: false, // Required field
        defaultValue:0
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false, // Required field
      },
      subtotalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false, // Required field
      },
      shippingCost:{
        type:Sequelize.JSONB
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
    await queryInterface.dropTable('Orders');
  }
};