'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subcategories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories', // Reference to Categories table
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete subcategory when category is deleted
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Subcategories', // Self-referential foreign key
          key: 'id',
        },
        onDelete: 'CASCADE', // Delete child subcategories if parent is deleted
        allowNull: true, // Allow null for root-level subcategories
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subcategories');
  },
};
