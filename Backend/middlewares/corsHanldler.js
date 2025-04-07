function corsHandler(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // O pon un dominio específico
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

module.exports = corsHandler;
