const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nconf = require('nconf');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('winston');
const routes = require('../../app/routes');
module.exports = callback => {

  let app = express();

  const server = http.createServer(app);

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  app.use(routes);

  server.listen(process.env.PORT, () => {
    logger.info('Server listening on port: ' + process.env.PORT);
  });

  callback();
};
