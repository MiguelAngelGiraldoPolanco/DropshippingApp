const boom = require('@hapi/boom');

class CartService {
  constructor() {
    // Aquí podemos almacenar los carritos en memoria o integrarlo con una base de datos.
    this.carts = []; // Solo para ejemplo, en un entorno real se usaría una base de datos.
  }

  async createCart(userId, products) {
    try {
      // Crear un carrito nuevo para el usuario
      const newCart = {
        userId,
        products,
      };

      // Agregar el carrito a la lista (simulación en memoria)
      this.carts.push(newCart);
      return newCart;
    } catch (error) {
      throw boom.badImplementation('Error creating cart');
    }
  }

  async getCart(userId) {
    try {
      // Buscar el carrito por el ID del usuario
      const cart = this.carts.find(cart => cart.userId === userId);

      if (!cart) {
        throw boom.notFound('Cart not found');
      }

      return cart;
    } catch (error) {
      throw boom.badImplementation('Error fetching cart');
    }
  }

  async updateCart(userId, products) {
    try {
      // Buscar el carrito por el ID del usuario
      const cart = this.carts.find(cart => cart.userId === userId);

      if (!cart) {
        throw boom.notFound('Cart not found');
      }

      // Actualizar los productos del carrito
      cart.products = products;
      return cart;
    } catch (error) {
      throw boom.badImplementation('Error updating cart');
    }
  }

  async deleteCart(userId) {
    try {
      // Eliminar el carrito del usuario
      const cartIndex = this.carts.findIndex(cart => cart.userId === userId);

      if (cartIndex === -1) {
        throw boom.notFound('Cart not found');
      }

      this.carts.splice(cartIndex, 1); // Eliminar el carrito
      return { message: 'Cart deleted successfully' };
    } catch (error) {
      throw boom.badImplementation('Error deleting cart');
    }
  }
}

module.exports = CartService;
