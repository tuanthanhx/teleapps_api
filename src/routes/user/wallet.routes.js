module.exports = (app) => {
  const router = require('express').Router();
  const wallets = require('../../controllers/wallet.controller');
  const rules = require('../../rules/wallet.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.getWallets, wallets.user.getWallets);
  router.get('/logs', rules.user.getLogs, wallets.user.getLogs);

  app.use(`/api-user/${apiVersion}/wallets`, router);
};
