module.exports = (app) => {
  const router = require('express').Router();
  const appCategories = require('../../controllers/app_category.controller');
  const rules = require('../../rules/app_category.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.developer.index, appCategories.developer.index);
  router.get('/:id', rules.developer.show, appCategories.developer.show);

  app.use(`/api-developer/${apiVersion}/app_categories`, router);
};
