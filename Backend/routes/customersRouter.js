const express = require('express');
const passport = require('passport');

const CustomersService = require('../services/customersServices');
const { createCustomerSchema ,updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const validatorHandler = require('../middlewares/validatorHandler');

const router = express.Router();
const service = new CustomersService();

router.get('/', async (req, res, next) => {
  try {
    const costomers = await service.find();  // Usa await para resolver la promesa
    res.json(costomers);  // Ahora 'users' tiene los datos de la consulta
  } catch (error) {
    next(error);  // Pasar el error al manejador de errores de Express
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const costomer = await service.findOne(id);
    res.json(costomer);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newCostomer = await service.create(body);
      res.status(201).json(newCostomer);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res , next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const costomer = await service.update(id, body);
    res.json(costomer);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
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
