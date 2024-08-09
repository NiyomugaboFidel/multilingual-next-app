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
  status: {
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue:'pending',
  },
  transportAmount: {
    type: DataTypes.INTEGER,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
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