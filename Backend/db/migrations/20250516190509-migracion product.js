'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDesc = await queryInterface.describeTable('orders_products');

    // Cambiar 'amount' a 'quantity_product'
    if (tableDesc.amount && !tableDesc.quantity_product) {
      await queryInterface.renameColumn('orders_products', 'amount', 'quantity_product');
    }

    // Agregar columna price_unit si no existe
    if (!tableDesc.price_unit) {
      await queryInterface.addColumn('orders_products', 'price_unit', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // O poner NULL si querés
      });
    }

    // Agregar columna updated_at si no existe
    if (!tableDesc.updated_at) {
      await queryInterface.addColumn('orders_products', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
    }

    // Cambiar constraint foreign key de order_id para onDelete CASCADE
    // Primero eliminar constraint existente
    await queryInterface.removeConstraint('orders_products', 'orders_products_order_id_fkey');

    // Agregar nuevo constraint con onDelete CASCADE
    await queryInterface.addConstraint('orders_products', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'orders_products_order_id_fkey',
      references: {
        table: 'orders',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir renombrado columna quantity_product a amount
    const tableDesc = await queryInterface.describeTable('orders_products');
    if (tableDesc.quantity_product && !tableDesc.amount) {
      await queryInterface.renameColumn('orders_products', 'quantity_product', 'amount');
    }

    // Eliminar price_unit
    if (tableDesc.price_unit) {
      await queryInterface.removeColumn('orders_products', 'price_unit');
    }

    // Eliminar updated_at
    if (tableDesc.updated_at) {
      await queryInterface.removeColumn('orders_products', 'updated_at');
    }

    // Revertir constraint onDelete CASCADE a SET NULL en order_id
    await queryInterface.removeConstraint('orders_products', 'orders_products_order_id_fkey');

    await queryInterface.addConstraint('orders_products', {
      fields: ['order_id'],
      type: 'foreign key',
      name: 'orders_products_order_id_fkey',
      references: {
        table: 'orders',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  }
};
