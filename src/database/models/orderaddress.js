'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
import sequelize from '../config/sequelize';
const OrderAddresses = sequelize.define('OrderAddresses',{
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
  shipping:{
    type:DataTypes.JSON,
    allowNull:false,
  },
  billingAddress:{
    type:DataTypes.JSON,
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
   tableName:'OrderAddresses'
})

export default OrderAddresses