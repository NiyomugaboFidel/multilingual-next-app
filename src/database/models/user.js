'use strict';
const {
  DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
import sequelize from '../config/sequelize';


  const User =sequelize.define('User',{
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:uuidv4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    role:{
      type:DataTypes.STRING,
      defaultValue:'buyer'
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

    tableName: 'Users',
    timestamps: true,
  });

  export default User

