module.exports = (app) => {
  const router = require('express').Router();
  const tasks = require('../../controllers/task.controller');
  const rules = require('../../rules/task.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.index, tasks.user.index);
  router.get('/:id', rules.user.show, tasks.user.show);
  router.post('/:id/start', tasks.user.start);
  router.post('/:id/submit', tasks.user.submit);
  router.post('/:id/claim', tasks.user.claim);

  app.use(`/api-user/${apiVersion}/tasks`, router);
};
