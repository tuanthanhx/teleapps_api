module.exports = (app) => {
  const router = require('express').Router();
  const wallets = require('../../controllers/wallet.controller');
  // const rules = require('../../rules/wallet.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', wallets.user.getWallets);

  app.use(`/api-user/${apiVersion}/wallets`, router);
};
