const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');  // Para manejar contraseñas de forma segura
const jwt = require('jsonwebtoken');  // Para generar tokens JWT

class CustomersService {
  // Crear un nuevo usuario y cliente
  async create(data) {
    const { email, password, ...customerData } = data;

    // Verificar si ya existe un usuario con ese email
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      throw boom.badRequest('Email already exists');
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await models.User.create({
      email,
      password: hashedPassword,  // Almacenar la contraseña hasheada
    });

    // Crear el cliente y vincularlo con el usuario
    const newCustomer = await models.Customer.create({
      user_id: newUser.id,  // Relacionar el cliente con el usuario
      ...customerData,  // Otros datos del cliente
    });

    return newCustomer;
  }

  // Buscar un cliente por su ID (y devolver también su información de usuario)
  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: [{ model: models.User, attributes: ['email'] }]  // Incluir datos del usuario (email)
    });

    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    return customer;
  }

  // Actualizar la información del cliente
  async update(id, changes) {
    const customer = await this.findOne(id);
    return customer.update(changes);
  }

  // Eliminar un cliente
  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }

  // Generar un token JWT para el usuario (esto lo usas cuando el cliente inicia sesión)
  signToken(user) {
    const payload = { sub: user.id };  // El 'sub' es el ID del usuario
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = CustomersService;
