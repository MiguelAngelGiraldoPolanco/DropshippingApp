const express = require('express');
const passport = require('passport');

const CustomersService = require('../services/customersServices');
const { createCustomerSchema ,updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const validatorHandler = require('../middlewares/validatorHandler');
const UserService = require('../services/usersServices');

const router = express.Router();
const service = new CustomersService();
const userService = new UserService();

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

router.post(
  '/',
  // passport.authenticate('jwt', { session: false }), // Descomentado si es necesario para autenticar
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log("Datos recibidos:", body);


      // Verificar si ya existe un cliente con el mismo correo
      const existingCustomer = await userService.findByEmail(body.user.email); // Asegúrate de tener esta función en tu servicio

      if (existingCustomer) {
        // Si ya existe, devolver un error 409
        return res.status(409).json({ error: 'Email already in use' });
      }

      // Si no existe, crear el nuevo cliente
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);


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
