const { Model, DataTypes, Sequelize } = require('sequelize');

const { PHOTOGRAPHER_TABLE } = require('./photographer.model');
const { CUSTOMER_TABLE } = require('./customer.model');

const COMMENT_TABLE = 'comments';

const CommentSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  photographerId: {
    field: 'photographer_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PHOTOGRAPHER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // o SET NULL si permites nulls
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
  content: {
    type: DataTypes.STRING,
    allowNull: false,
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

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.Photographer, {
      as: 'photographer',
      foreignKey: 'photographerId',
    });
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: 'Comment',
      timestamps: false,
    };
  }
}

module.exports = { COMMENT_TABLE, CommentSchema, Comment };
