const axios = require('axios');
const boom = require('@hapi/boom');
const productResponseSchema = require('../schemas/productResponseSchema');

class ProductsService {
  async fetchProductsFromAliExpress(queryParams) {
    try {
      const response = await axios.get('https://api.aliexpress.com/products', {
        params: queryParams, // Puedes agregar parámetros de búsqueda aquí
      });

      // Verificar si la respuesta contiene productos
      if (!response.data || !response.data.products) {
        throw boom.notFound('No products found');
      }

      const products = response.data.products; // Suponiendo que AliExpress devuelve una lista de productos

      // Validar cada producto usando el esquema
      const validProducts = [];
      for (const product of products) {
        try {
          await productResponseSchema.validateAsync(product); // Verifica que el producto cumple con el esquema
          validProducts.push(product);
        } catch (validationError) {
          console.error(`Product validation failed for ${product.productId}:`, validationError);
          // Aquí podrías loguear el error o continuar con el siguiente producto si quieres omitir los que fallan
        }
      }

      return validProducts; // Devuelves solo los productos válidos
    } catch (error) {
      console.error('Error fetching products from AliExpress:', error);
      throw boom.badImplementation('Error fetching products from AliExpress');
    }
  }

  async findOne(id) {
    try {
      const response = await axios.get(`https://api.aliexpress.com/products/${id}`);
      const product = response.data; // Suponiendo que AliExpress devuelve un solo producto

      if (!product) {
        throw boom.notFound('Product not found');
      }

      // Validar el producto usando el esquema
      await productResponseSchema.validateAsync(product); // Verifica que el producto cumple con el esquema

      return product;
    } catch (error) {
      console.error('Error fetching product from AliExpress:', error);
      if (error.isBoom) {
        throw error;  // Si el error es un Boom error, lo dejamos pasar
      } else {
        throw boom.notFound('Product not found');
      }
    }
  }
}

module.exports = ProductsService;
