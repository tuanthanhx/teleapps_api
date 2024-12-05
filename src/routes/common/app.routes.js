module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.common.index, apps.common.index);
  router.get('/new', rules.common.new, apps.common.new);
  router.get('/trending', rules.common.trending, apps.common.trending);
  router.get('/:id', rules.common.show, apps.common.show);
  router.get('/:id/reviews', rules.common.getReviews, apps.common.getReviews);

  app.use(`/api-common/${apiVersion}/apps`, router);
};
