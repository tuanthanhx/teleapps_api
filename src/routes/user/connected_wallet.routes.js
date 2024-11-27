module.exports = (app) => {
  const router = require('express').Router();
  const connectedWallets = require('../../controllers/connected_wallet.controller');
  const rules = require('../../rules/connected_wallet.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.getWallet, connectedWallets.user.getWallet);
  router.post('/', rules.user.setWallet, connectedWallets.user.setWallet);
  router.delete('/', rules.user.removeWallet, connectedWallets.user.removeWallet);

  app.use(`/api-user/${apiVersion}/connected_wallets`, router);
};
