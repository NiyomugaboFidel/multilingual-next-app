'use strict';
const {
  Model,
  DataTypes

} = require('sequelize');
const { default: sequelize } = require('../config/sequelize');

const Notifications  = sequelize.define('Notifications',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  subject: DataTypes.STRING,
  message: DataTypes.JSONB,
  entityId: DataTypes.JSONB,
  receiver: DataTypes.STRING,

},{
  timestamps:true,
  tableName:'Notifications'
})

export default Notifications