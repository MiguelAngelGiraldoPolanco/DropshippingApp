const express = require('express');
const passport = require('passport');

const UsersService = require('./../services/usersServices');
const { createUserSchema ,updateUserSchema, getUserSchema } = require('./../schemas/userSchema');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkAdminRole } = require('./../middlewares/authHandler');
const router = express.Router();
const service = new UsersService();

router.get('/',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  checkAdminRole,
  async (req, res, next) => {
  try {
    const users = await service.find();  // Usa await para resolver la promesa
    res.json(users);  // Ahora 'users' tiene los datos de la consulta
  } catch (error) {
    next(error);  // Pasar el error al manejador de errores de Express
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  checkAdminRole,
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  checkAdminRole,
  validatorHandler(createUserSchema, "body"),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),  // Autenticación de JWT
  checkAdminRole,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res , next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getUserSchema, 'params'),
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
