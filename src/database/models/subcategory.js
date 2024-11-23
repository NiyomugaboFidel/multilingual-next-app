import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Category from './category';

const Subcategory = sequelize.define('Subcategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  parent_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Subcategories',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Subcategories',
  timestamps: true,
});

// Define associations
Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Subcategory.hasMany(Subcategory, { foreignKey: 'parent_id', as: 'subcategories' });
Subcategory.belongsTo(Subcategory, { foreignKey: 'parent_id', as: 'parent' });

export default Subcategory;
