'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
import sequelize from '../config/sequelize';
const { v4: uuidv4 } = require('uuid');
const Category = sequelize.define('Category',{
  id:{
    type:DataTypes.UUIDV4,
    defaultValue:uuidv4,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type:DataTypes.STRING,
  },
  isVailable:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
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
  tableName:'Categories',
  timestamps:true
})
export default Category