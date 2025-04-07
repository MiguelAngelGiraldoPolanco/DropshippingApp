const express = require('express');

const CategoriesService = require('./../services/categoriesServices');
const { getCategorySchema }= require('./../schemas/categorySchema');
const validatorHandler = require('./../middlewares/validatorHandler');

const router = express.Router();
const service = new CategoriesService();

router.get('/',
  async (req, res, next) => {
  try {
    const categories =  await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
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

module.exports = router;
