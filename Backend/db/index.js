const { Sequelize } = require('sequelize');
const {
  setupModels,
  User,
  Product,
  Customer,
  Order,
  Category,
  OrderProduct,
  Photographer,
  Photograph,
  Comment,
  Rating
} = require('./models');

// Crear instancia Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

// Inicializar modelos
setupModels(sequelize);

module.exports = {
  sequelize,
  User,
  Product,
  Customer,
  Order,
  Category,
  OrderProduct,
  Photographer,
  Photograph,
  Comment,
  Rating
};
