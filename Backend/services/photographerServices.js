const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PhotographerService {
  async create(data) {
    const newPhotographer = await models.Photographer.create(data);
    return newPhotographer;
  }

  async findAll() {
    return await models.Photographer.findAll({ include: ['customer'] });
  }

  async findOne(id) {
    const photographer = await models.Photographer.findByPk(id, {
      include: ['customer'],
    });
    if (!photographer) throw boom.notFound('Photographer not found');
    return photographer;
  }

  async update(id, changes) {
    const photographer = await this.findOne(id);
    return await photographer.update(changes);
  }

  async delete(id) {
    const photographer = await this.findOne(id);
    await photographer.destroy();
    return { message: 'Photographer deleted' };
  }
}

module.exports = PhotographerService;
