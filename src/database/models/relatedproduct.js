'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Product from './product';

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

Product.hasMany(RelatedProduct, { foreignKey: 'product_id', as: 'RelatedProducts' });
RelatedProduct.belongsTo(Product, { foreignKey: 'product_id', as: 'Products' });
Product.hasMany(RelatedProduct, { foreignKey: 'related_product_id', as: 'Products' });
// RelatedProduct.belongsTo(Product, { foreignKey: 'related_product_idd', as: 'Products' });

export default RelatedProduct;
