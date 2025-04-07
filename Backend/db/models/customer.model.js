const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, // Puedes agregar más detalles si es necesario
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'updated_at'
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order,{
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName : CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }
