const fs = require('fs');
const path = require('path');
const request = require('supertest');
const { app } = require('../../server');
const db = require('../../src/models');

const api = `/api-common/${process.env.VERSION}`;

module.exports = async () => {
  await db.user.destroy({
    where: {
      email: 'test-user@gmail.com',
    },
  });
};
