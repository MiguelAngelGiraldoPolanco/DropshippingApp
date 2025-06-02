'use strict';

const { PHOTOGRAPHER_TABLE, PhotographerSchema } = require('../models/photographer.model');
const { PHOTOGRAPH_TABLE, PhotographSchema } = require('./../models/photograph.model');
const { COMMENT_TABLE, CommentSchema } = require('./../models/comment.model');
const { RATING_TABLE, RatingSchema } = require('./../models/rating.model');


module.exports = {
  up: async (queryInterface) => {
    // Crear las tablas sin incluir el campo 'total' de la migración, ya que es virtual
     try {
      await queryInterface.createTable(PHOTOGRAPHER_TABLE, PhotographerSchema);
      await queryInterface.createTable(PHOTOGRAPH_TABLE, PhotographSchema);
      await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
      await queryInterface.createTable(RATING_TABLE, RatingSchema);
    } catch (error) {
      console.error('❌ Error en la migración:', error);
      throw error; // vuelve a lanzar el error para que Sequelize lo detecte
    }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PHOTOGRAPHERS_TABLE);
    await queryInterface.dropTable(PHOTOGRAPH_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(RATING_TABLE);

  }
};
