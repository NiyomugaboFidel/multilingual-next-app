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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      sub_category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Subcategories',
          key: 'id',
        },
      },
      nestedsub_category_id: {
        type:Sequelize.UUID,
        references: {
          model: 'NestedSubcategories',
          key: 'id',
        },
      },
      brand: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stock_availability: {
        type: Sequelize.STRING,
        defaultValue: 'In Stock',
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ratings:{
        type:Sequelize.JSONB
      },
      average_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      review_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expiry_date: {
        type: Sequelize.STRING,
      },
      isExpired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      seller_name: {
        type: Sequelize.STRING,
      },
      seller_rating: {
        type: Sequelize.FLOAT,
      },
      free_shipping: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      delivery_time: {
        type: Sequelize.STRING,
      },
      return_policy: {
        type: Sequelize.STRING,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
