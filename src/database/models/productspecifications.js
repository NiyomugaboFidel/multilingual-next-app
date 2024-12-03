'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Product from './product';

const ProductSpecification = sequelize.define('ProductSpecification', {
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
  spec_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spec_value: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'ProductSpecifications',
  timestamps: true,
});

Product.hasMany(ProductSpecification, { foreignKey: 'product_id', as: 'productspecifications' });
ProductSpecification.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });


export default ProductSpecification;
