'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');
const { CUSTOMER_TABLE, CustomerSchema } = require('./../models/customer.model');


module.exports = {
  async up(queryInterface, Sequelize) {
    // Cambiar password de User a allowNull: true
    await queryInterface.changeColumn(USER_TABLE, 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Cambiar address de Customer a allowNull: true
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Cambiar phone de Customer a allowNull: true
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Volver a dejar los campos como obligatorios en caso de rollback
    await queryInterface.changeColumn(USER_TABLE, 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'address', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};

