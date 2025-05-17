// comment.router.js
const express = require('express');
const router = express.Router();

const CommentService = require('../services/commentServices');
const validatorHandler = require('../middlewares/validatorHandler');
const { createCommentSchema, updateCommentSchema, getCommentSchema } = require('../schemas/commentSchema');
const { checkAdminRole, checkRoles } = require('../middlewares/authHandler');
const { requireAuth } = require('@clerk/express');

const service = new CommentService();

router.get('/', async (req, res, next) => {
  try {
    const comments = await service.find();
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCommentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await service.findOne(id);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  requireAuth(),
  validatorHandler(createCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComment = await service.create(body);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  requireAuth(),
  validatorHandler(getCommentSchema, 'params'),
  validatorHandler(updateCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const comment = await service.update(id, body);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkRoles('admin'),
  validatorHandler(getCommentSchema, 'params'),
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
