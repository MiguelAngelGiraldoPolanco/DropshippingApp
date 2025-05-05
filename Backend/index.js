require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors , errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
const { checkApiKey } = require('./middlewares/authHandler');
const logRequest = require('./middlewares/loggingHandler');
const corsHandler = require('./middlewares/corsHanldler');
const sessionHandler = require('./middlewares/sessionHandler');
const securityHeaders = require('./middlewares/securityHeadersHanlder');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
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

app.post('/create-checkout-session', async (req, res) => {
  try {
    const items = req.body.items;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'No se recibieron productos válidos' });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // en centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/cart?success=true',
      cancel_url: 'http://localhost:5173/cart?canceled=true',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
});



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



