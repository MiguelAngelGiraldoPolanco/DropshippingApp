const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');
const { PHOTOGRAPHER_TABLE } = require('./photographer.model');

const RATING_TABLE = 'ratings';

const RatingSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  customerId: {
    field: 'customer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  photographId: {
    field: 'photographer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PHOTOGRAPHER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'updated_at',
  },
};

class Rating extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId',
    });
    this.belongsTo(models.Photographer, {
      as: 'photographer',
      foreignKey: 'photographerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RATING_TABLE,
      modelName: 'Rating',
      timestamps: false,
    };
  }
}

module.exports = { RATING_TABLE, RatingSchema, Rating };
