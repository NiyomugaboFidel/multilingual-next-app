'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      isAvailable: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
      },
      category: {
        type: Sequelize.STRING,
      },
      sellerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // Ensure your actual table name is correct
          key: 'id',
        },
      },
      bonus: Sequelize.INTEGER,
      images: Sequelize.ARRAY(Sequelize.STRING),
      expiryDate: Sequelize.DATE,
      averageRating: Sequelize.DECIMAL,
      isExpired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ratings: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
