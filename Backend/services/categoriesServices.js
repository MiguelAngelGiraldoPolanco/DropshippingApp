const { models }= require('../libs/sequelize')

const boom = require('@hapi/boom');

class CategoriesService{
  constructor(){}

async create(data){
  const newCategory = await models.Category.create(data);
  return newCategory;
}

async find(){
  const rta = await models.Category.findAll();
  return rta;
}

async findOne(id){
  const category = await models.Category.findByPk(id, {
    include: ['products']
  });
  if (!category) {
    throw boom.notFound('Category not found');
  }
  return category;
}

async update(id, changes){
  const category = await this.findOne(id);
  const rta = category.update(changes);
  return rta;
}

async delete(id){
  const category = await this.findOne(id);
  await category.destroy();
  return { id };
}

}

module.exports = CategoriesService;
