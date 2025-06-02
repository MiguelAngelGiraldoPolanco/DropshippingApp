import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: process.env.DATABASE_DIALECT,
// });

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  }
);

export default sequelize;
