const { LoremIpsum } = require('lorem-ipsum');
const db = require('../models');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1,
  },
  wordsPerSentence: {
    max: 10,
    min: 5,
  },
});

module.exports = {
  async up (queryInterface) {
    try {
      const apps = await db.app.findAll({
        attributes: ['id'],
        order: [['createdAt', 'ASC']],
      });

      const users = await db.user.findAll({
        where: {
          userGroupId: {
            [db.Sequelize.Op.or]: [1, 2],
          },
        },
        attributes: ['id'],
      });

      const baseTime = new Date();
      let timeIncrement = 0;

      const updates = apps.map((appInstance) => {
        const insertData = [];

        for (let i = 0; i < 3; i++) {
          const min = 1;
          const max = 5;
          const randomNum = Math.random() * (max - min) + min;
          const randomIndex = Math.floor(Math.random() * users.length);
          insertData.push({
            userId: users[randomIndex].id,
            appId: appInstance.id,
            rate: randomNum,
            message: lorem.generateParagraphs(1),
            createdAt: new Date(baseTime.getTime() + timeIncrement),
            updatedAt: new Date(baseTime.getTime() + timeIncrement),
          });
          timeIncrement += 1000;
        }

        return queryInterface.bulkInsert('app_reviews', insertData, {});
      });

      await Promise.all(updates);
    } catch (error) {
      console.error(error);
    }
  },
};
