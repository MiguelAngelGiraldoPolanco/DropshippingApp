// photographer.router.js
const express = require('express');
const router = express.Router();

const PhotographerService = require('../services/photographerServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createPhotographerSchema, updatePhotographerSchema, getPhotographerSchema } = require('../schemas/photographerSchema');
const { checkAdminRole, checkRoles } = require('../middlewares/authHandler');
const { requireAuth } = require('@clerk/express');

const service = new PhotographerService();
router.use(express.json());

router.get('/', async (req, res, next) => {
  try {
    const photographers = await service.findAll();
    res.json(photographers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPhotographerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const photographer = await service.findOne(id);
      res.json(photographer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // requireAuth(),
  validatorHandler(createPhotographerSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log('req.body:', req.body);
      const body = req.body;
      const newPhotographer = await service.create(body);
      res.status(201).json(newPhotographer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  requireAuth(),
  validatorHandler(getPhotographerSchema, 'params'),
  validatorHandler(updatePhotographerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const photographer = await service.update(id, body);
      res.json(photographer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getPhotographerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;



