const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class RatingService {
  async create(data) {
    const newRating = await models.Rating.create(data);
    return newRating;
  }

  async findAll() {
    return await models.Rating.findAll({ include: ['photograph', 'customer'] });
  }

  async findOne(id) {
    const rating = await models.Rating.findByPk(id, {
      include: ['photograph', 'customer'],
    });
    if (!rating) throw boom.notFound('Rating not found');
    return rating;
  }

  async update(id, changes) {
    const rating = await this.findOne(id);
    return await rating.update(changes);
  }

  async delete(id) {
    const rating = await this.findOne(id);
    await rating.destroy();
    return { message: 'Rating deleted' };
  }
}

module.exports = RatingService;
