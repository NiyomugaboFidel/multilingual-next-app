'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RelatedProducts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Products', // Reference to the Products table
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      related_product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Products', // Reference to the Products table
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RelatedProducts');
  },
};
