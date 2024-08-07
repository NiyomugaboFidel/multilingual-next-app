'use strict';
 const {
   DataTypes
 } = require('sequelize');
 import sequelize from '../config/sequelize';

const ProductWishList  = sequelize.define('ProductWishList',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: 'Users', key: 'id' },
  },
  productId: {
    type: DataTypes.UUID,
    references: { model: 'Products', key: 'id' },
  }
},
{
  timestamps:true,
  tableName: 'ProductWishLists',
})

export default ProductWishList