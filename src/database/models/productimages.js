'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Product from './product';

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.STRING,
  },
  imageColor: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'ProductImages',
  timestamps: true,
});



// Define associations
Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'productimages' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export default ProductImage;
