'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const RelatedProduct = sequelize.define('RelatedProduct', {
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
  related_product_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
}, {
  tableName: 'RelatedProducts',
  timestamps: true,
});

RelatedProduct.associate = (models) => {
  RelatedProduct.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });
  RelatedProduct.belongsTo(models.Product, {
    foreignKey: 'related_product_id',
    as: 'relatedProduct',
  });
};

export default RelatedProduct;
