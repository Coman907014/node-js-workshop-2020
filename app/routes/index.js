const express = require('express');
const logger = require('winston');

const controllers = require('../controllers');
const { ServerError } = require('../helpers/server-error');

const router = express.Router();

const {
  test,
  task,
  user
} = controllers;

const requestHandler = (promise, params) => async (req, res, next) => {
  const receivedParams = params ? params(req, res, next) : [];

  try {
    const result = await promise(...receivedParams);

    return res.json({
      status: 200,
      redirectLocation: 'www.google.com',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const apiRouter = express.Router();

// test
apiRouter.post('/test', requestHandler(test.test, (req, res, next) => [req.body]));
apiRouter.get('/test', requestHandler(test.test));

// tasks
apiRouter.post('/tasks', requestHandler(task.createTask, (req, res) => [req, res]));
apiRouter.post('/car-submission-inch', requestHandler(task.returnRedirectLocation, (req, res) => [req, res]));
apiRouter.get('/tasks', requestHandler(task.getAllTasks, (req, res) => [req, res]));
apiRouter.get('/tasks/:id', requestHandler(task.getTaskById, (req, res) => [req, res]));
apiRouter.delete('/tasks/:id', requestHandler(task.deleteById, (req, res) => [req, res]));
apiRouter.patch('/tasks/:id', requestHandler(task.updateById, (req, res) => [req, res]));

// user
apiRouter.post('/users', requestHandler(user.createOne, (req, res) => [req, res]));
apiRouter.get('/users', requestHandler(user.getAll));
apiRouter.get('/users/:email', requestHandler(user.getByEmail, (req, res) => [req, res]));
apiRouter.delete('/users/:email', requestHandler(user.deleteByEmail, (req, res) => [req, res]));
apiRouter.post('/users/:id', requestHandler(user.updateById, (req, res) => [req, res]));


router.use(apiRouter);

/**
 * 404
 */
router.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not found!'
  });
});

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
    return res.status(err.status || 500).json({ status: err.status || 500, message: err.message});
  }

  logger.error('!!!! Unexpected error exception start !!!!');
  logger.error(err);
  logger.error('!!!! Unexpected error exception end !!!!');


  return res.status(500).json({ status: 500, message: err.message });
});

module.exports = router;
