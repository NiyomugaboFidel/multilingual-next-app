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
     gender:DataTypes.STRING,
     prefferedLanguage:DataTypes.STRING,
     prefferedCurrency:DataTypes.STRING,
     userAddress:DataTypes.JSONB,
     phoneN:DataTypes.STRING,
       isBlock:DataTypes.BOOLEAN,
       refreshToken:DataTypes.STRING,
       refreshTokenExpired:{
        type:DataTypes.DATE,
        defaultValue:Date.now()
       },
     profilePic:{
      type:DataTypes.STRING,
      defaultValue:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
     },
     isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mustUpdatePassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastTimePasswordUpdated:{
      type: DataTypes.DATE,
      defaultValue:new Date()
    },
    expired:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    provider:DataTypes.STRING,
    googleId:DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
 
  }, {

    tableName: 'Users',
    timestamps: true,
  });

  export default User

