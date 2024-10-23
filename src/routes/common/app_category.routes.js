module.exports = (app) => {
  const router = require('express').Router();
  const appCategories = require('../../controllers/app_category.controller');
  const rules = require('../../rules/app_category.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.common.index, appCategories.common.index);
  router.get('/:id', rules.common.show, appCategories.common.show);
  router.get('/:id/slider', rules.common.getSlider, appCategories.common.getSlider);

  app.use(`/api-common/${apiVersion}/app_categories`, router);
};
