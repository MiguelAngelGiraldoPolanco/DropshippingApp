const express = require('express');
const passport = require('passport');

const OrdersService = require('./../services/ordersServices');

const router = express.Router();
const service = new CategoriesService();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    const orders =  await service.findByUser(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
