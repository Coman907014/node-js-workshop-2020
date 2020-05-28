const nconf  = require('nconf');
const logger = require('winston');
const async = require('async');

nconf.use('memory');

nconf.set('NODE_PORT', 3001);

logger.info('Starting server');

async.series([
  callback => {
    require('./config/initializers/dbConnection/mongoDB')(callback)
  },
  callback => {
    require('./config/initializers/dbConnection/mysql')(callback)
  },
  callback => {
    require('./config/initializers/server')(callback);
  },
  callback => {
    require('./config/initializers/graphQLServer')(callback)
  }], error => {
    if (error) {
      logger.error ('Server initialization failed! ', error);
    } else {
      logger.info('Server started!');
    }
});
