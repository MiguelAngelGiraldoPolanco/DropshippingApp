const express = require('express');

const CategoriesService = require('./../services/categoriesServices');
const { getCategorySchema }= require('./../schemas/categorySchema');
const validatorHandler = require('./../middlewares/validatorHandler');

const router = express.Router();
const service = new CategoriesService();

router.get('/',
  async (req, res, next) => {
    try {
      // Obtener las categorías desde el servicio
      const categories = await service.fetchCategories(req.query);
      res.json(categories);  // Enviar las categorías como respuesta
    } catch (error) {
      next(error);  // Pasar el error al manejador de errores de Express
    }
  }
);

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
