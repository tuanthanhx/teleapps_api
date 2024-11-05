module.exports = (app) => {
  const router = require('express').Router();
  const accounts = require('../../controllers/account.controller');
  const rules = require('../../rules/account.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.post('/developer-request', rules.user.developerRequest, accounts.user.developerRequest);

  app.use(`/api-user/${apiVersion}/account`, router);
};
