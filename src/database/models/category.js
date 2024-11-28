import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Categories',
  timestamps: true,
});

export default Category;
