module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.developer.index, apps.developer.index);
  router.get('/statistics', rules.developer.statistics, apps.developer.statistics);
  router.get('/:id', rules.developer.show, apps.developer.show);
  router.post('/', rules.developer.create, apps.developer.create);

  app.use(`/api-developer/${apiVersion}/apps`, router);
};
