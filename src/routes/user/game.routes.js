module.exports = (app) => {
  const router = require('express').Router();
  const games = require('../../controllers/game.controller');
  // const rules = require('../../rules/game.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/balance', games.user.getBalance);
  router.get('/play-count', games.user.getPlayCount);
  router.get('/leaderboard', games.user.getLeaderboard);
  router.get('/history', games.user.getHistory);
  router.post('/start', games.user.startGame);
  router.post('/submit', games.user.submitScore);

  app.use(`/api-user/${apiVersion}/games`, router);
};
