const express = require('express');
const passport = require('passport');

const OrderService = require('./../services/ordersServices');
const { getOrderSchema ,createOrderSchema, addItemSchema,  } = require('./../schemas/orderSchema');
const validatorHandler = require('./../middlewares/validatorHandler');
const { requireAuth } = require('@clerk/express');

const router = express.Router();
const service = new OrderService();
router.use(express.json());

router.get('/:id',
  requireAuth(),
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/',
   async (req, res, next) => {
  try {
    const orders =  await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  requireAuth(),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      }
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, "body"),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
