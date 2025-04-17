const express = require('express');
const passport = require('passport'); // middleware para la autenticacion de los usuarios

const ProductsService = require('./../services/productsServices');
const { bulkCreateProductSchema, createProductSchema ,updateProductSchema, getProductSchema, queryProductSchema } = require('./../schemas/productSchema');
const validatorHandler = require('./../middlewares/validatorHandler');

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'), // validador que creamos para asegurarnos que el producto que se pide ver tenga los requerimientos solicitados
  async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'), // validador que creamos para asegurarnos que el producto que se pide ver tenga el id correcto
  async (req, res,next) => { // aqui pasamos con el next el middleware para que mande el mensaje
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'), // validador que creamos para asegurarnos que el producto que se crea tenga los requerimientos solicitados
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
});

router.post(
  '/bulk',
  validatorHandler(bulkCreateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProducts = await service.createBulk(data);
      res.status(201).json(newProducts);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
  res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
