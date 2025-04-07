// instalamos pg y hacemos la coneccion a la base de datos luego lo exportamos para que pueda ser usado en usuarios
const { Client } = require('pg');

async function getConnection() {
  const client= new Client({
    host: 'localhost',
    port: 5432,
    user: 'miguel',
    password: 'admin123',
    database: 'my_store'
  });

  await client.connect();
  return client;
}


module.exports= getConnection;
