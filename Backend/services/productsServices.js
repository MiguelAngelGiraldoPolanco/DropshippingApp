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

  async find(query) {
    try {
      const options = {
        include: ['category'],
        where: {},
      };

      const { limit, offset, price, price_min, price_max, categoryId } = query;

      if (limit && offset) {
        options.limit = parseInt(limit);
        options.offset = parseInt(offset);
      }

      if (price) {
        options.where.price = price;
      }

      if (categoryId) {
        options.where.categoryId = categoryId;
      }

      if (price_min && price_max) {
        options.where.price = {
          [Op.gte]: price_min,
          [Op.lte]: price_max,
        };
      }

      const products = await models.Product.findAll(options);
      return products;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
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
  const product = await models.Product.findByPk(id, {
    include: [
      'category',
      {
        association: 'orderProducts',
        include: ['order'] // también puedes incluir el producto si quieres más profundidad
      }
    ]
  });

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
