const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models }= require('../libs/sequelize')

class UsersService{

  constructor(){}

  async create(data){
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await models.User.create({
        ...data,
        password: hash,
      });
      delete newUser.dataValues.password; // Eliminar el campo password del objeto devuelto
      return newUser;
  }
   // ejemplo de como conectar y hacer una consulta a la base de datos que tengo en libs postgres.js
  async find(){
      const rta = await models.User.findAll({
        include: 'customer'
      });
      return rta;  // Retorna los usuarios encontrados.
  }

  async findByEmail(email){
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }

  async findOne(id){
      const user = await models.User.findByPk(id);
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
  }

  async update(id, changes){
      const user = await this.findOne(id);
      const rta = user.update(changes);
      return rta;
  }

  async delete(id){
      const user = await this.findOne(id);
      await user.destroy();
      return { id };
  }
}

module.exports = UsersService;
