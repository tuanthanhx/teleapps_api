module.exports = (app) => {
  const router = require('express').Router();
  const appCategories = require('../../controllers/app_category.controller');
  const rules = require('../../rules/app_category.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.admin.index, appCategories.admin.index);
  router.get('/:id', rules.admin.show, appCategories.admin.show);

  app.use(`/api-admin/${apiVersion}/app_categories`, router);
};
