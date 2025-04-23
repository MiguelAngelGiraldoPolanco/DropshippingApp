const express = require('express');
const passport = require('passport');

const CategoriesService = require('./../services/categoriesServices');
const { createCategorySchema ,updateCategorySchema, getCategorySchema }= require('./../schemas/categorySchema');
const validatorHandler = require('./../middlewares/validatorHandler');
const { checkAdminRole, checkRoles } = require('./../middlewares/authHandler');


const router = express.Router();
const service = new CategoriesService();

router.get('/',
  // passport.authenticate('jwt', {session: false}),
  // checkRoles('admin', 'customer'),
  async (req, res, next) => {
  try {
    const categories =  await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  // passport.authenticate('jwt', {session: false}),
  // checkRoles('admin', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } =  req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }

});

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }

});
// este es el ejemplo de como se usa asyn await esto deben tenerlo todos y las clases tambien
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  // passport.authenticate('jwt', { session: false }),
  // checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
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
