import componentLoader from './component-loader.js';
import db from '../db/sequelize.js';
const { User, Customer, Photographer, Product, Category } = db;

const options = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    { resource: User },
    { resource: Product },
    { resource: Customer },
    { resource: Photographer },
    { resource: Category }, // agregado Category
  ],
  databases: [],
};

export default options;
