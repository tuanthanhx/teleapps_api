const { LoremIpsum } = require('lorem-ipsum');
const db = require('../models');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
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

      const baseTime = new Date();
      let timeIncrement = 0;

      const updates = apps.map((appInstance) => {
        const insertData = [];

        for (let i = 0; i < 5; i++) {
          insertData.push({
            appId: appInstance.id,
            version: `1.0.${i}`,
            description: lorem.generateParagraphs(1),
            createdAt: new Date(baseTime.getTime() + timeIncrement),
            updatedAt: new Date(baseTime.getTime() + timeIncrement),
          });
          timeIncrement += 1000;
        }

        return queryInterface.bulkInsert('app_histories', insertData, {});
      });

      await Promise.all(updates);
    } catch (error) {
      console.error(error);
    }
  },
};
