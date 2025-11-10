'use strict';
const { logInfo } = require('../utils/logger');

function requestLogger(req, _res, next) {
  logInfo('http_request', {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip
  });
  next();
}

module.exports = {
  requestLogger
};

