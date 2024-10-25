const crypto = require('crypto');
const db = require('../models');

module.exports = {
  async up () {
    try {
      const users = await db.user.findAll({
        attributes: ['id'],
        order: [['createdAt', 'ASC']],
      });

      const actions = users.map(async (user) => {
        const walletExists = await db.wallet.findOne({
          where: { userId: user.id },
        });

        if (!walletExists) {
          return db.wallet.create({
            userId: user.id,
            id: `0x${crypto.createHash('md5').update(user.id).digest('hex')}`,
            ticket: 0,
            coin: 0,
            usdt: 0,
            ton: 0,
          });
        }
        return null;
      });

      await Promise.all(actions);
    } catch (error) {
      console.error(error);
    }
  },
};
