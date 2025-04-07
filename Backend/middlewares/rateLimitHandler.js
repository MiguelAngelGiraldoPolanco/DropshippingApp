const rateLimit = require('express-rate-limit');

// Establecer un límite de 100 solicitudes por cada 15 minutos
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutos en milisegundos
  max: 100, // Número máximo de solicitudes permitidas por IP
  message: 'Too many requests from this IP, please try again later.' // Mensaje cuando se alcanza el límite
});

module.exports = limiter;
