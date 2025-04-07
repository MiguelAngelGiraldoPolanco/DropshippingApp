const express =require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const customersRouter = require('./customersRouter');
const ordersRouter = require('./ordersRouter');
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

function routerApi(app) {
  const router = express.Router();  // esto se hace por si mi api tiene muchas versiones para no tener que cambiar cada uno de lo srouter
                                    // y solo con la primera app.use puedo modificar cada una de las rutas o cambiar a versiones diferentes en el futuro como en el ejemplo de abajo
  app.use('/api/v1',router)

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
