'use strict';
const {
  DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
import sequelize from '../config/sequelize';

  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    sellerId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',  // Ensure this matches the name of your Users table
        key: 'id',
      },
    },
    bonus: {
      type: DataTypes.INTEGER,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
    averageRating: {
      type: DataTypes.DECIMAL,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ratings: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'Products', // Ensure the correct table name
    timestamps: true, // Adjust based on your requirements
  });
  
  module.exports = Product;

 

