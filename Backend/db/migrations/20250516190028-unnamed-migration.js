'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Quitar columna 'products' si existe
    const tableDesc = await queryInterface.describeTable('orders');
    if (tableDesc.products) {
      await queryInterface.removeColumn('orders', 'products');
    }

    // 2. Quitar columna 'total' si existe (no la querés)
    if (tableDesc.total) {
      await queryInterface.removeColumn('orders', 'total');
    }

    // 3. Asegurar columna 'status' con default 'pending'
    if (!tableDesc.status) {
      await queryInterface.addColumn('orders', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      });
    } else {
      await queryInterface.changeColumn('orders', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
      });
    }

    // 4. Asegurar que customer_id existe y es FK correcta
    if (!tableDesc.customer_id) {
      await queryInterface.addColumn('orders', 'customer_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    // 5. Cambiar created_at y updated_at para default CURRENT_TIMESTAMP
    await queryInterface.changeColumn('orders', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.changeColumn('orders', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    // Aquí revertir los cambios si quieres
    const tableDesc = await queryInterface.describeTable('orders');

    if (!tableDesc.products) {
      await queryInterface.addColumn('orders', 'products', {
        type: Sequelize.JSONB,
        allowNull: false,
      });
    }

    if (!tableDesc.total) {
      await queryInterface.addColumn('orders', 'total', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }

    // Opcional: eliminar status y customer_id, cambiar defaults de timestamps
    if (tableDesc.status) {
      await queryInterface.removeColumn('orders', 'status');
    }
    if (tableDesc.customer_id) {
      await queryInterface.removeColumn('orders', 'customer_id');
    }
    await queryInterface.changeColumn('orders', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
    });
    await queryInterface.changeColumn('orders', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null,
    });
  },
};
