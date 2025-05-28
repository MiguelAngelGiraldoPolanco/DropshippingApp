import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/sequelize';
import db from './sequelize.js'; // ajusta la ruta si es necesario

const { sequelize, User, Customer, Photographer, Product, Category } = db;

AdminJS.registerAdapter({
  Database,
  Resource,
});

const initialize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    return { sequelize };
  } catch (error) {
    console.error('Unable to connect to the database:', error);

    return {};
  }
};

export default initialize;
