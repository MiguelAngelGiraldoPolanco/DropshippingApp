// rating.router.js
const express = require('express');
const router = express.Router();

const RatingService = require('../services/ratingServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createRatingSchema, updateRatingSchema, getRatingSchema } = require('../schemas/ratingSchema');
const { checkAdminRole, checkRoles } = require('../middlewares/authHandler');
const { requireAuth } = require('@clerk/express');

const service = new RatingService();

router.get('/', async (req, res, next) => {
  try {
    const ratings = await service.find();
    res.json(ratings);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getRatingSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rating = await service.findOne(id);
      res.json(rating);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  requireAuth(),
  validatorHandler(createRatingSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRating = await service.create(body);
      res.status(201).json(newRating);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getRatingSchema, 'params'),
//   validatorHandler(updateRatingSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const rating = await service.update(id, body);
//       res.json(rating);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getRatingSchema, 'params'),
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
