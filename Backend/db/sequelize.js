const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });
module.exports = sequelize;
module.exports.default = sequelize; // Para compatibilidad con ES Modules
