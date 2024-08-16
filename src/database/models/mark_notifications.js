'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const { default: sequelize } = require('../config/sequelize');
const Mark_Notifications  = sequelize.define('Mark_Notifications',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  notificationId:{
    type:DataTypes.UUID,
    references: { model: 'Notifications', key: 'id' },
  }, 
  receiverId:{
    type:DataTypes.UUID,
    references: { model: 'Users', key: 'id' },
  }, 
 is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},{
  tableName:'Mark_Notifications',
  timestamps:true
})

export default Mark_Notifications