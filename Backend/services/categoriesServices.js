const axios = require('axios');  // Si usas axios para hacer peticiones HTTP a AliExpress

class CategoriesService {
  constructor() {}

  // Obtiene todas las categorías desde AliExpress
  async find() {
    try {
      const response = await axios.get('API_URL_ALIEXPRESS_CATEGORIES');  // URL de la API de AliExpress
      return response.data;  // Retorna las categorías obtenidas de la API
    } catch (error) {
      throw new Error('Error al obtener las categorías de AliExpress');
    }
  }

  // Obtiene una categoría específica desde AliExpress
  async findOne(id) {
    try {
      const response = await axios.get(`API_URL_ALIEXPRESS_CATEGORIES/${id}`);  // URL con el ID de la categoría
      if (!response.data) {
        throw new Error('Categoría no encontrada');
      }
      return response.data;  // Retorna la categoría específica
    } catch (error) {
      throw new Error('Error al obtener la categoría de AliExpress');
    }
  }
}

module.exports = CategoriesService;
