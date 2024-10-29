module.exports = (app) => {
  const router = require('express').Router();
  const tasks = require('../../controllers/task.controller');
  // const rules = require('../../rules/task.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', tasks.user.index);
  router.get('/:id', tasks.user.show);
  router.post('/:id/start', tasks.user.start);

  app.use(`/api-user/${apiVersion}/tasks`, router);
};
