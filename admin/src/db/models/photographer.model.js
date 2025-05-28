import { Model, DataTypes, Sequelize } from 'sequelize';
import { CUSTOMER_TABLE } from './customer.model.js';

export const PHOTOGRAPHER_TABLE = 'photographers';

export const PhotographerSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  portfolioUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    allowNull: false,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'updated_at',
  },
};

export class Photographer extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PHOTOGRAPHER_TABLE,
      modelName: 'Photographer',
      timestamps: false,
    };
  }
}
