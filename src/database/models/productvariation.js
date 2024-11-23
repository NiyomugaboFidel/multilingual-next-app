'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const ProductVariation = sequelize.define('ProductVariation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  color: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
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
  tableName: 'ProductVariations',
  timestamps: true,
});

ProductVariation.associate = (models) => {
  ProductVariation.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
};

export default ProductVariation;
