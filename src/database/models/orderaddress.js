'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
import sequelize from '../config/sequelize';
const OrderAddress = sequelize.define('OrderAddress',{
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull:false,
    references:{model:'Users', key:'id'}
  },
  billingAddres:{
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
   tableName:'OrderAddress'
})

export default OrderAddress