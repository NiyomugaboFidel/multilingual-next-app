'use strict';

const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
import sequelize from '../config/sequelize';
import Category from './category';
import User from './user';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      sub_category_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Subcategories',
          key: 'id',
        },
      },
  brand: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock_availability: {
    type: DataTypes.STRING,
    defaultValue: 'In Stock',
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  average_rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  review_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  expiry_date: {
    type: DataTypes.STRING,
  },
  isExpired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  seller_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  seller_name: {
    type: DataTypes.STRING,
  },
  seller_rating: {
    type: DataTypes.FLOAT,
  },
  free_shipping: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  delivery_time: {
    type: DataTypes.STRING,
  },
  return_policy: {
    type: DataTypes.STRING,
  },
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
}, {
  tableName: 'Products',
  timestamps: true, // Adjust based on your requirements
});

Product.belongsTo(User, { as: 'user', foreignKey: 'seller_id' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'categories' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
export default Product;
