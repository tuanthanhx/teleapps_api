module.exports = (app) => {
  const router = require('express').Router();
  const profiles = require('../../controllers/profile.controller');
  // const rules = require('../../rules/game.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', profiles.user.getProfile);
  router.post('/', profiles.user.updateProfile);

  app.use(`/api-user/${apiVersion}/profile`, router);
};
