import { Sequelize } from 'sequelize';
import { Customer, CustomerSchema } from './models/customer.model.js';
import { User, UserSchema } from './models/user.model.js';
import { Product, ProductSchema } from './models/product.model.js';
import { Photographer, PhotographerSchema } from './models/photographer.model.js';
import { Category, CategorySchema } from './models/category.model.js';

import { Order, OrderSchema } from './models/order.model.js';
import { OrderProduct, OrderProductSchema } from './models/order-product.model.js';  // O como se llame tu archivo

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
});

// Inicializar modelos
Customer.init(CustomerSchema, Customer.config(sequelize));
User.init(UserSchema, User.config(sequelize));
Product.init(ProductSchema, Product.config(sequelize));
Photographer.init(PhotographerSchema, Photographer.config(sequelize));
Category.init(CategorySchema, Category.config(sequelize));
Order.init(OrderSchema, Order.config(sequelize));
OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

// Asociaciones
Customer.associate?.({ User, Photographer, Product, Category, Order });
User.associate?.({ Customer });
Photographer.associate?.({ Customer });
Product.associate?.({ Category, OrderProduct });
Category.associate?.({ Product });
Order.associate?.({ Customer, OrderProduct });
OrderProduct.associate?.({ Order, Product });

const db = {
  sequelize,
  Customer,
  User,
  Product,
  Photographer,
  Category,
  Order,
  OrderProduct,
};

export default db;
