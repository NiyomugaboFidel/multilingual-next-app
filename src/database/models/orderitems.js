'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
import sequelize from '../config/sequelize';
const OrderItems = sequelize.define('OrderItems',{
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull:false,
    references:{model:'Orders', key:'id'}
  },
  products:{
    type:DataTypes.JSONB,
    allowNull:false,
  },
   createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
 
},{
   timestamps:true,
   tableName:'OrderItems'
})

export default OrderItems