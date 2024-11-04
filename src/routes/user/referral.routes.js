module.exports = (app) => {
  const router = require('express').Router();
  const referrals = require('../../controllers/referral.controller');
  const rules = require('../../rules/referral.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.getReferrals, referrals.user.getReferrals);

  app.use(`/api-user/${apiVersion}/referrals`, router);
};
