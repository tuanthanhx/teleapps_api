module.exports = (app) => {
  const router = require('express').Router();
  const sliders = require('../../controllers/slider.controller');
  const rules = require('../../rules/slider.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.common.index, sliders.common.index);
  router.get('/:id', rules.common.show, sliders.common.show);

  app.use(`/api-common/${apiVersion}/sliders`, router);
};
