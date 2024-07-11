'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
import sequelize from '../config/sequelize';

  const OTP =sequelize.define('OTP',{
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:uuidv4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    otp: {
      type: DataTypes.STRING,
      allowNull:false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull:false
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
       tableName:'OTPs',
       timestamps:true
  });

  export default OTP;
