const { models }= require('../libs/sequelize')
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

class CustomersService{

  constructor(){}

  async create(data) {
    let userData = { ...data.user };

    if (userData.password) {
      const hash = await bcrypt.hash(userData.password, 10);
      userData.password = hash;
    }

    const newData = {
      ...data,
      user: userData,
    };

    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });

    // Elimina la contraseña de la respuesta
    if (newCustomer.user) {
      delete newCustomer.user.dataValues.password;
    }

    return newCustomer;
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
