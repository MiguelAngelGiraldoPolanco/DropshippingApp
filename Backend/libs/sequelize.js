const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// url postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// conexion a postgres

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});


setupModels(sequelize);

module.exports = sequelize;
