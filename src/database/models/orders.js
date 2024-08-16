'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
import sequelize from '../config/sequelize';

const Orders = sequelize.define('Orders',{
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull:false,
    references:{model:'Users', key:'id'}
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.JSONB), // Array of objects in Sequelize (PostgreSQL specific)
    allowNull: false,
  },
  customer:{
    type:DataTypes.JSONB,
    allowNull:false,
  },
  delivery_status: {
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue:'pending',
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  paymentIntentId:{
    type: DataTypes.STRING,
  },
  paymentInfo: {
    type: DataTypes.JSONB, // Corresponds to JSONB in PostgreSQL
    allowNull: true, // Optional
  },
  
  shipping: {
    type: DataTypes.JSONB, // Corresponds to JSONB in PostgreSQL
    allowNull: false, // Required field
  },
  phoneNumber: {
    type: DataTypes.STRING, // Corresponds to VARCHAR in PostgreSQL
    allowNull: true, // Optional
  },
 transportAmount: {
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false, // Required field
  },
  subtotalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false, // Required field
  },
  shippingCost:{
   type:DataTypes.JSONB
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
     tableName:'Orders',
     timestamps:true

})

export default Orders


