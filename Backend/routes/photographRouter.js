// photograph.router.js
const express = require('express');
const router = express.Router();

const PhotographService = require('../services/photographServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createPhotographSchema, updatePhotographSchema, getPhotographSchema } = require('../schemas/photographSchema');
const { checkAdminRole, checkRoles } = require('../middlewares/authHandler');
const { requireAuth } = require('@clerk/express');

const service = new PhotographService();
router.use(express.json());

router.get('/', async (req, res, next) => {
  try {
    const photographs = await service.findAll();
    res.json(photographs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPhotographSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const photograph = await service.findOne(id);
      res.json(photograph);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // requireAuth(),
  validatorHandler(createPhotographSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPhotograph = await service.create(body);
      res.status(201).json(newPhotograph);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  requireAuth(),
  validatorHandler(getPhotographSchema, 'params'),
  validatorHandler(updatePhotographSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const photograph = await service.update(id, body);
      res.json(photograph);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getPhotographSchema, 'params'),
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
