const { Model, DataTypes, Sequelize } = require('sequelize');

const { PHOTOGRAPHER_TABLE } = require('./photographer.model');

const PHOTOGRAPH_TABLE = 'photographs';

const PhotographSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photographerId: {
    field: 'photographer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PHOTOGRAPHER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

class Photograph extends Model {
  static associate(models) {
    this.belongsTo(models.Photographer, {
      as: 'photographer',
      foreignKey: 'photographerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PHOTOGRAPH_TABLE,
      modelName: 'Photograph',
      timestamps: false,
    };
  }
}

module.exports = { PHOTOGRAPH_TABLE, PhotographSchema, Photograph };
