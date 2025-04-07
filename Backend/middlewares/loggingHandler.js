const fs = require('fs');
const path = require('path');

function logRequest(req, res, next) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(path.join(__dirname, 'logs', 'requests.log'), log);
  next();
}

module.exports = logRequest;
