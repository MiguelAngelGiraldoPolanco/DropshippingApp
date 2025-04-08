const axios = require('axios');
const boom = require('@hapi/boom');
const { categoriesResponseSchema } = require('../schemas/categorySchema');

class CategoryService {
  async fetchCategories(queryParams) {
    try {
      // Realizar la solicitud a la API de AliExpress para obtener las categorías
      const response = await axios.get('https://api.aliexpress.com/categories', {
        params: queryParams, // Puedes agregar parámetros de búsqueda si es necesario
      });

      // Validar la respuesta utilizando el esquema
      const categories = response.data.categories; // Suponiendo que AliExpress devuelve una lista de categorías

      // Validar cada categoría con el esquema
      await categoriesResponseSchema.validateAsync(categories);

      return categories;
    } catch (error) {
      throw boom.badImplementation('Error fetching categories from AliExpress');
    }
  }
  async findOne(id) {
      try {
        const response = await axios.get(`https://api.aliexpress.com/categories/${id}`);
        const category = response.data; // Suponiendo que AliExpress devuelve un solo producto

        if (!category) {
          throw boom.notFound('Category not found');
        }

        // Validar la categoria usando el esquema
        await productResponseSchema.validateAsync(category); // Verifica que la categoria cumple con el esquema

        return category;
      } catch (error) {
        console.error('Error fetching category from AliExpress:', error);
        if (error.isBoom) {
          throw error;  // Si el error es un Boom error, lo dejamos pasar
        } else {
          throw boom.notFound('Category not found');
        }
      }
    }
}

module.exports = CategoryService;
