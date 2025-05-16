require('dotenv').config();

const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors , errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
const { checkApiKey } = require('./middlewares/authHandler');
const logRequest = require('./middlewares/loggingHandler');
const corsHandler = require('./middlewares/corsHanldler');
const sessionHandler = require('./middlewares/sessionHandler');
const securityHeaders = require('./middlewares/securityHeadersHanlder');
const { clerkMiddleware } = require('@clerk/express');
const webhookRouter = require('./routes/webhookRouter');
const stripeRouter = require('./routes/stripeRouter');

const app = express();
const port = process.env.PORT || 3005;

// app.use(express.json());
app.use(clerkMiddleware());
// Uso global de los middlewares
// app.use(logRequest);
// app.use(corsHandler);
// app.use(sessionHandler);
app.use(securityHeaders);

const whitelist = ['http://localhost:8080', 'https://myapp.com']; // esta es la lista de los dominios que tienen acceso a mi api

// const opctions = { // aqui verificamos que los dominios que se ingresen sean los que estan definidos como permitidos
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin || !origin)){
//       callback(null,true);
//     }else {
//       callback(new Error('acceso no permitido'));
//     }
//   }
// }

// app.use(cors(opctions)); // aqui verifica los permisos a los dominios que le di acceso

app.use(cors()); // esto le da acceso a cualquiera que pida solicitud a la api

require('./utils/auth'); // aqui se inicializa el passport y se carga la estrategia local para que funcione en toda la app

routerApi(app);
// deben declararse despues de router despues que la app este levantada
// deben ir en orden segun nos interese en este caso el errorhandler no tiene next y mata la app
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`esta corriendo por http://localhost:${port}`);
});



