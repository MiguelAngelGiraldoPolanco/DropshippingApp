const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PhotographService {
  async create(data) {
    const newPhotograph = await models.Photograph.create(data);
    return newPhotograph;
  }

  async findAll() {
    return await models.Photograph.findAll({ include: ['photographer'] });
  }

  async findOne(id) {
    const photo = await models.Photograph.findByPk(id, {
      include: ['photographer'],
    });
    if (!photo) throw boom.notFound('Photograph not found');
    return photo;
  }

  async update(id, changes) {
    const photo = await this.findOne(id);
    return await photo.update(changes);
  }

  async delete(id) {
    const photo = await this.findOne(id);
    await photo.destroy();
    return { message: 'Photograph deleted' };
  }
}

module.exports = PhotographService;
