const morgan = require('morgan');
const logger = require('../utils/logger');

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  },
);

module.exports = morganMiddleware;
