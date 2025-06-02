import { Model, DataTypes, Sequelize } from 'sequelize';
import { ORDER_TABLE } from './order.model.js';
import { PRODUCT_TABLE } from './product.model.js';

export const ORDER_PRODUCT_TABLE = 'orders_products';

export const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: 'quantity_product',
  },
  priceUnit: {
    field: 'price_unit',
    allowNull: false,
    type: DataTypes.INTEGER, // Precio en centavos para evitar decimales
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' // Mejor borrar productos si borras la orden
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

export class OrderProduct extends Model {

  static associate(models) {
    this.belongsTo(models.Order, { as: 'order', foreignKey: 'orderId' });
    this.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    };
  }
}
