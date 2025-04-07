const csrf = require('csurf');

// Crear una instancia de protección CSRF
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;
