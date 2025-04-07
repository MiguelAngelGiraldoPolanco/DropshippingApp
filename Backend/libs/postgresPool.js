// se conecta una sola vez y hace un await interno para no estar conectandome en cada solicitud que hago, es mas optimo
const { Pool } = require('pg');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool= new Pool({ connectionString: URI });

module.exports= pool;
