module.exports = (app) => {
  const router = require('express').Router();
  const taskCategories = require('../../controllers/task_category.controller');
  const rules = require('../../rules/task_category.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.index, taskCategories.user.index);

  app.use(`/api-user/${apiVersion}/task_categories`, router);
};
