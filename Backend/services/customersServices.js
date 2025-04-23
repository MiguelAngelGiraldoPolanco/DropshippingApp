const { models }= require('../libs/sequelize')
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class CustomersService{

  constructor(){}

  async create(data){
      const hash = await bcrypt.hash(data.user.password, 10);
      const newData = {
        ...data,
        user: {
          ...data.user,
          password: hash,
        }
      };
      const newCostomer = await models.Customer.create(newData, {
        include: ['user']
    });
      delete newCostomer.user.dataValues.password;
      return newCostomer;
  }
   // ejemplo de como conectar y hacer una consulta a la base de datos que tengo en libs postgres.js
  async find(){
      const rta = await models.Customer.findAll({
        include: ['user']
      });
      return rta;  // Retorna los usuarios encontrados.
  }

  async findOne(id){
      const costomer = await models.Customer.findByPk(id);
      if (!costomer) {
        throw boom.notFound('User not found');
      }
      return costomer;
  }

  async update(id, changes){
      const costomer = await this.findOne(id);
      const rta = costomer.update(changes);
      return rta;
  }

  async delete(id){
      const costomer = await this.findOne(id);
      await costomer.destroy();
      return { id };
  }
}

module.exports = CustomersService;
