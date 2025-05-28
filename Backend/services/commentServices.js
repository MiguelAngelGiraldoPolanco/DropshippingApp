const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CommentService {
  async create(data) {
    const newComment = await models.Commet.create(data);
    return newComment;
  }

  async findAll() {
    return await models.Commet.findAll({ include: ['photograph', 'customer'] });
  }

  async findOne(id) {
    const comment = await models.Commet.findByPk(id, {
      include: ['photograph', 'customer'],
    });
    if (!comment) throw boom.notFound('Comment not found');
    return comment;
  }

  async update(id, changes) {
    const comment = await this.findOne(id);
    return await comment.update(changes);
  }

  async delete(id) {
    const comment = await this.findOne(id);
    await comment.destroy();
    return { message: 'Comment deleted' };
  }
}

module.exports = CommentService;
