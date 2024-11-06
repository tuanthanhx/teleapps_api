module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.developer.index, apps.developer.index);
  router.get('/statistics', rules.developer.statistics, apps.developer.statistics);
  // router.get('/:id', rules.common.show, apps.common.show);
  // router.get('/:id/histories', rules.common.getHistories, apps.common.getHistories);
  // router.get('/:id/reviews', rules.common.getReviews, apps.common.getReviews);

  app.use(`/api-developer/${apiVersion}/apps`, router);
};
