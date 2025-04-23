const { ValidationError } = require("sequelize");
const boom = require('@hapi/boom');

function logErrors( err, req, res, next){ // este middleware se encarga de mostrar por ocnsola en error
  console.error(err);
  next(err);
}

function errorHandler( err, req, res, next){ // este para la funcion por que no tiene next y muestra el error al usuario en un json
  if (res.headersSent) {
    return next(err); // Si los encabezados ya fueron enviados, delega al siguiente middleware
  }
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler( err, req, res, next){
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return;
  }
  next(err);

}

function ormErrorHandler( err, req, res, next){
  if (err instanceof ValidationError){
    res.status(409).json({
      statusCode : 409,
      message: err.name,
      errors: err.errors
    });
    return;
  }
  next(err);
}


module.exports = { logErrors , errorHandler, boomErrorHandler, ormErrorHandler };


