const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Order, OrderSchema } = require('./order.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Photographer, PhotographerSchema } = require('./photographer.model');
const { Photograph, PhotographSchema } = require('./photograph.model');
const { Comment, CommentSchema } = require('./comment.model'); // Recuerda: nombre correcto sería "Comment"
const { Rating, RatingSchema } = require('./rating.model');

function setupModels(sequelize) {
  // 1. Inicializar modelos
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Photographer.init(PhotographerSchema, Photographer.config(sequelize));
  Photograph.init(PhotographSchema, Photograph.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  Rating.init(RatingSchema, Rating.config(sequelize));

  // 2. Asociar modelos
  const models = sequelize.models;
  User.associate(models);
  Customer.associate(models);
  Order.associate(models);
  Category.associate(models);
  Product.associate(models);
  OrderProduct.associate(models);
  Photographer.associate(models);
  Photograph.associate(models);
  Comment.associate(models);
  Rating.associate(models);
}

module.exports = setupModels;
