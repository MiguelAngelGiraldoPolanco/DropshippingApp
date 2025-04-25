const faker = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op, where } = require('sequelize');


const { models } = require('../libs/sequelize');

class ProductsService {

  constructor(){}

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    try {
      // Obtiene todos los productos de la base de datos
      const products = await models.Product.findAll();
      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
    // const options = {
    //   include: ['category'],
    //   where: {},
    // }
    // const { limit, offset } = query;
    // if (limit && offset) {
    //   options.limit =  limit;
    //   options.offset =  offset;
    // }
    // const { price } = query;
    // if (price) {
    //   options.where.price = price;
    // }

    // const { price_min, price_max } = query;
    // if (price_min && price_max) {
    //   options.where.price = {
    //     [Op.gte]: price_min,
    //     [Op.lte]: price_max,
    //   };
    // }

      // Realiza la consulta para obtener todos los productos, o los productos limitados si se usan 'limit' y 'offset'.
      // const products = await models.Product.findAll();
      // return products;
  }

  async findByCategory(categoryId) {
    const products = await models.Product.findAll({
      where: {
        categoryId,
      },
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
      if (!product) {
        throw boom.notFound('Product not found');
      }
      return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

  async createBulk(productsArray) {
    const createdProducts = await models.Product.bulkCreate(productsArray, {
      validate: true
    });
    return createdProducts;
  }
}

module.exports = ProductsService;
