// db/middlewares/securityHeadersHandler.js
const helmet = require('helmet');

const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      styleSrc: ["'self'", "https://js.stripe.com", "'unsafe-inline'"],
      frameSrc: ["https://js.stripe.com"],
    },
  },
  crossOriginEmbedderPolicy: false, // Necesario a veces para Stripe
});

module.exports = securityHeaders;
