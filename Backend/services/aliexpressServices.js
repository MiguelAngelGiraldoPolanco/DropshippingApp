const axios = require('axios');
const boom = require('@hapi/boom');

class AliExpressService {
  constructor() {
    this.baseUrl = 'https://api.aliexpress.com'; // URL base de la API de AliExpress
    this.apiKey = process.env.ALIEXPRESS_API_KEY; // Clave de API desde las variables de entorno
  }

  // Obtener detalles de un producto por su ID
  async getProductDetails(productId) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw boom.badImplementation('Error fetching product details from AliExpress');
    }
  }

  // Obtener una lista de productos por categoría
  async getProductsByCategory(categoryId) {
    try {
      const response = await axios.get(`${this.baseUrl}/categories/${categoryId}/products`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw boom.badImplementation('Error fetching products by category from AliExpress');
    }
  }

  // Generar un enlace de afiliado para un producto
  generateAffiliateLink(productId) {
    const affiliateId = process.env.ALIEXPRESS_AFFILIATE_ID;
    return `https://www.aliexpress.com/item/${productId}.html?aff=${affiliateId}`;
  }

  // Consultar comisiones generadas por un pedido
  async getAffiliateCommission(orderId) {
    try {
      const response = await axios.get(`${this.baseUrl}/orders/${orderId}/commission`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw boom.badImplementation('Error fetching commission details from AliExpress');
    }
  }
}

module.exports = AliExpressService;
