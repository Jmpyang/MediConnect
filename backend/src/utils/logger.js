'use strict';
/* Minimal logger wrapper for consistency */

function logInfo(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level: 'info', message, ...meta }));
}

function logError(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.error(JSON.stringify({ level: 'error', message, ...meta }));
}

module.exports = {
  logInfo,
  logError
};

