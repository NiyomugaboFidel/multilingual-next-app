'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const ProductSpecification = sequelize.define('ProductSpecification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

ProductSpecification.associate = (models) => {
  ProductSpecification.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
};

export default ProductSpecification;
