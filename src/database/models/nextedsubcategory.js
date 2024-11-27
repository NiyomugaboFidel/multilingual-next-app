import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Subcategory from './subcategory.js';

const NestedSubcategory = sequelize.define('NestedSubcategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subcategory_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Subcategories',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'NestedSubcategories',
  timestamps: true,
});


// Define associations
Subcategory.hasMany(NestedSubcategory, { foreignKey: 'subcategory_id', as: 'nestedsubcategories' });
NestedSubcategory.belongsTo(Subcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

export default NestedSubcategory;
